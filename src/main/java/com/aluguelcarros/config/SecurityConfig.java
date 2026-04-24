package com.aluguelcarros.config;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;
import java.util.Locale;

@Singleton
public class SecurityConfig {

    @Inject
    public SecurityConfig() {
    }

    public List<String> rotasPublicas() {
        return List.of(
                "POST /api/auth/login/cliente",
                "POST /api/auth/login/agente",
                "POST /api/auth/cadastro/cliente",
                "GET /api/veiculos",
                "GET /api/veiculos/disponiveis",
                "GET /"
        );
    }

    public boolean rotaPublica(String method, String path) {
        String normalizedMethod = method == null ? "" : method.trim().toUpperCase(Locale.ROOT);
        if ("OPTIONS".equals(normalizedMethod)) {
            return true;
        }
        String normalizedPath = normalizePath(path);
        return rotasPublicas().contains(normalizedMethod + " " + normalizedPath);
    }

    private String normalizePath(String path) {
        String p = path == null ? "" : path.trim();
        if (p.isEmpty()) return "/";
        if (!p.startsWith("/")) p = "/" + p;
        if (p.length() > 1 && p.endsWith("/")) p = p.substring(0, p.length() - 1);
        return p;
    }
}

