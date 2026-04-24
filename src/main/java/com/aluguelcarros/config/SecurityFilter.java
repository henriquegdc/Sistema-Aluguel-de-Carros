package com.aluguelcarros.config;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.annotation.Filter;
import io.micronaut.http.filter.HttpServerFilter;
import io.micronaut.http.filter.ServerFilterChain;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Mono;

@Filter("/**")
@Singleton
public class SecurityFilter implements HttpServerFilter {

	private final JwtConfig jwtConfig;
	private final SecurityConfig securityConfig;

	@Inject
	public SecurityFilter(JwtConfig jwtConfig, SecurityConfig securityConfig) {
		this.jwtConfig = jwtConfig;
		this.securityConfig = securityConfig;
	}

	@Override
	public Publisher<MutableHttpResponse<?>> doFilter(HttpRequest<?> request, ServerFilterChain chain) {
		if (rotaPublica(request)) {
			return chain.proceed(request);
		}

		String auth = request.getHeaders().getAuthorization().orElse(null);
		if (auth == null || !auth.regionMatches(true, 0, "Bearer ", 0, "Bearer ".length())) {
			return Mono.just(HttpResponse.status(HttpStatus.UNAUTHORIZED));
		}

		String token = auth.substring("Bearer ".length()).trim();
		if (!jwtConfig.validarToken(token)) {
			return Mono.just(HttpResponse.status(HttpStatus.UNAUTHORIZED));
		}

		return chain.proceed(request);
	}

	private boolean rotaPublica(HttpRequest<?> request) {
		return securityConfig.rotaPublica(request.getMethod().name(), request.getPath());
	}
}
