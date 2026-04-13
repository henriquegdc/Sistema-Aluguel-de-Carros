package com.aluguelcarros.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;

import java.util.Map;

@Controller
public class HomeController {

    @Get(uri = "/")
    public HttpResponse<Map<String, String>> index() {
        return HttpResponse.ok(Map.of(
                "service", "aluguelcarros-api",
                "status", "UP"
        ));
    }
}
