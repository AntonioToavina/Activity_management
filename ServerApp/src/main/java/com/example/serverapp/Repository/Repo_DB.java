package com.example.serverapp.Repository;

import com.example.serverapp.Generalization.Main.Pagination;
import com.example.serverapp.Generalization.Service.DB_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;

@Repository
public class Repo_DB {
    @Autowired
    private EntityManager entityManager;

    public List<Object> search(String query, int incrementPage) {
        try {
            if (incrementPage == -2)
                return entityManager.createQuery(query).getResultList();

            new Pagination().nextPage(incrementPage);
            return entityManager.createQuery(query).setMaxResults(Pagination.pageable.getPageSize()).setFirstResult(Pagination.pageable.getPageNumber()).getResultList();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public <T> List<T> find(T object, int incrementPage) throws Exception {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = new DB_Service().createPredicate(object, "and", cb);

        if (incrementPage == 0)
            new Pagination().init1(object, this);

        if (incrementPage == -2)
            return entityManager.createQuery(criteriaQuery).getResultList();

        new Pagination().nextPage(incrementPage);
        return entityManager.createQuery(criteriaQuery).setMaxResults(Pagination.pageable.getPageSize()).setFirstResult(Pagination.pageable.getPageNumber()).getResultList();
    }
}
