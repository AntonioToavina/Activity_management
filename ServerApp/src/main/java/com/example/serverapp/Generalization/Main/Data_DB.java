package com.example.serverapp.Generalization.Main;

import com.example.serverapp.Generalization.Service.Data_Service;
import com.example.serverapp.Repository.Repo_DB;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public class Data_DB {

    public <T> T findBy_Id(int id, JpaRepository<?, Integer> repo) {
        Optional<?> optional = repo.findById(id);
        return (T) optional.orElse(null);
    }

    public <T> List<Object> find(T obj, Repo_DB repo_db, Boolean ifstrict, int incrementPage, String table) throws Exception {
        try {
            if (incrementPage == 0)
                new Pagination().init(obj, repo_db, table);

            return repo_db.search(new Data_Service().createScript(obj, ifstrict, table), incrementPage);
        } catch (Exception e) {
            throw e;
        }
    }
}
