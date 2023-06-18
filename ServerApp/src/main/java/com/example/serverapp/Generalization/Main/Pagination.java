package com.example.serverapp.Generalization.Main;

import com.example.serverapp.Repository.Repo_DB;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class Pagination {
    public static int page = 1;
    static final int limit = 5;
    public static Pageable pageable = PageRequest.of(0, limit);
    public static int nbResultSet = 0;

    public void init(Object obj, Repo_DB repo_db, String table) throws Exception {
        try {
            List<Object> list = new Data_DB().find(obj, repo_db, false, -2, table);
            nbResultSet = list.size();
            pageable = PageRequest.of(0, limit);
            page = 1;
        } catch (Exception e) {
            throw e;
        }
    }

    public void init1(Object obj, Repo_DB repo_db) throws Exception {
        List<Object> list = repo_db.find(obj, -2);
        nbResultSet = list.size();
        pageable = PageRequest.of(0, limit);
        page = 1;
    }

    public void nextPage(int increment) {
        int start = pageable.getPageNumber();
        start = start + (increment * limit);

        if (start >= Pagination.nbResultSet || start <= 0) {
            pageable = PageRequest.of(0, limit);
            page = 1;
        } else {
            Pagination.page = Pagination.page + increment;
            Pagination.pageable = PageRequest.of(start, limit);
        }
    }
}
