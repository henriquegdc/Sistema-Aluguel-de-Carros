package com.aluguelcarros.exception;

import io.micronaut.http.annotation.Produces;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;

import java.util.HashMap;
import java.util.Map;

@Produces
@Singleton
public class GlobalExceptionHandler implements ExceptionHandler<RuntimeException, HttpResponse<Map<String, Object>>> {

    @Override
    @SuppressWarnings("rawtypes")
    public HttpResponse<Map<String, Object>> handle(HttpRequest request, RuntimeException exception) {
        Map<String, Object> body = new HashMap<>();
        body.put("erro", exception.getMessage());
        body.put("path", request.getPath());

        if (exception instanceof RecursoNaoEncontradoException) {
            return HttpResponse.notFound(body);
        }
        if (exception instanceof AcessoNegadoException) {
            return HttpResponse.status(HttpStatus.UNAUTHORIZED).body(body);
        }
        return HttpResponse.badRequest(body);
    }
}
