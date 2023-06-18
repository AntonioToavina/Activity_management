package com.example.serverapp.Generalization.Main;

import com.example.serverapp.Generalization.Service.PDF_Service;
import com.example.serverapp.Repository.Repo_DB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CrudService {
    PDF_Service pdf_service;

    @Autowired
    public CrudService(PDF_Service pdf_service) {
        this.pdf_service = pdf_service;
    }

    public <T, ID> Object save(T object, JpaRepository<T, ID> repo) throws Exception {
        try {
            repo.save(object);
            return "Creation " + object.getClass().getSimpleName() + " réussi";
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
    }

    public <T, ID> List<T> findAll(JpaRepository<T, ID> repo) throws Exception {
        try {
            System.out.println();
            return repo.findAll();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public <T, ID> T findById(JpaRepository<T, ID> repo, ID id) throws Exception {
        try {
            Optional<T> optional = repo.findById(id);
            return optional.orElse(null);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public <T, ID> T update(T object, JpaRepository<T, ID> repo) throws Exception {
        try {
            return repo.save(object);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public <T> List<Object> search(T obj, Repo_DB repo_db, int page, String tableName) throws Exception {
        try {
            return new Data_DB().find(obj, repo_db, false, page, tableName);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public <T, ID> InputStreamResource generatePDF(JpaRepository<T, ID> repo, T object) throws Exception {
        try {
            List<T> list = repo.findAll();
            return new InputStreamResource(this.pdf_service.generate(list, object));
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
