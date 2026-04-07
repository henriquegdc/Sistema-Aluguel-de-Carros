package com.aluguelcarros.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.server.types.files.StreamedFile;

import java.io.InputStream;

@Controller
public class HomeController {

    @Get(uri = "/", produces = MediaType.TEXT_HTML)
    public HttpResponse<StreamedFile> index() {
        InputStream stream = getClass().getResourceAsStream("/static/index.html");
        if (stream == null) {
            return HttpResponse.notFound();
        }
        return HttpResponse.ok(new StreamedFile(stream, MediaType.TEXT_HTML_TYPE));
    }
}
