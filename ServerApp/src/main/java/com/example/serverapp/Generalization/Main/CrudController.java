package com.example.serverapp.Generalization.Main;

import com.example.serverapp.Repository.Repo_DB;
import com.example.serverapp.Util.ErrorResponse;
import com.example.serverapp.Util.ResponseData;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

public class CrudController<T, R extends JpaRepository<T, ID>, S extends CrudService, ID> {
    T entity;

    protected R repo;

    protected S service;

    protected Repo_DB repo_db;

    public CrudController(T entity, R repo, S service, Repo_DB repo_db) {
        this.entity = entity;
        this.repo = repo;
        this.repo_db = repo_db;
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Object> findAll() {
        try {
            return new ResponseEntity<>(new ResponseData(this.service.findAll(this.repo)), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable ID id) {
        try {
            return new ResponseEntity<>(new ResponseData(this.service.findById(this.repo, id)), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        }
    }

    @PostMapping
    public ResponseEntity<Object> create(@Valid @RequestBody T objectBody) {
        try {
            return new ResponseEntity<>(new ResponseData(this.service.save(objectBody, this.repo)), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        }
    }

    @PutMapping
    public ResponseEntity<Object> update(@Valid @RequestBody T objectBody) {
        try {
            return new ResponseEntity<>(this.service.update(objectBody, this.repo), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        }
    }

    @PostMapping("/find")
    public ResponseEntity<Object> search(@RequestBody T objBody, int page) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseData(this.repo_db.find(objBody, page)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseData(e.getMessage()));
        }
    }

    @GetMapping("/pdf")
    public ResponseEntity<Object> generatePDF() throws Exception {
        InputStreamResource input = this.service.generatePDF(this.repo, entity);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline;filename=File.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(input);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable ID id) throws Exception {
        try {
            this.service.delete(this.repo, id);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseData(" Object supprimé "));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseData(e.getMessage()));
        }
    }

    @ExceptionHandler(Exception.class)
    public Object handleRequestBodyError(JsonMappingException ex) {
        return new ErrorResponse(ex.getOriginalMessage());
    }
}
