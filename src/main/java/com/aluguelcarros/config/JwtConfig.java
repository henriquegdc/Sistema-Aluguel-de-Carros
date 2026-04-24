package com.aluguelcarros.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

@Singleton
public class JwtConfig {

    private final String secret;
    private final Long expirationMs;

    @Inject
    public JwtConfig(
            @Value("${jwt.secret:}") String secret,
            @Value("${jwt.expiration-ms:86400000}") Long expirationMs
    ) {
        this.secret = secret;
        this.expirationMs = expirationMs;
    }

    public String gerarToken(Long userId, String perfil, String login) {
        SecretKey key = getSigningKey();
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("login", login)
                .claim("perfil", perfil)
                .issuedAt(now)
                .expiration(exp)
                .signWith(key)
                .compact();
    }

    public boolean validarToken(String token) {
        if (token == null || token.isBlank()) {
            return false;
        }
        try {
            Claims claims = extrairClaims(token);
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public Claims extrairClaims(String token) {
        SecretKey key = getSigningKey();
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSigningKey() {
        String secretNormalizado = secret == null ? "" : secret.trim();
        if (secretNormalizado.isEmpty()) {
            throw new IllegalStateException("JWT secret nao configurado.");
        }
        try {
            byte[] hash = MessageDigest.getInstance("SHA-256")
                    .digest(secretNormalizado.getBytes(StandardCharsets.UTF_8));
            return Keys.hmacShaKeyFor(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Algoritmo SHA-256 indisponivel.", e);
        }
    }
}

