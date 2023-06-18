package com.example.serverapp.Generalization.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class DB_Service {

    public <T> void createCondition(List<Predicate> predicates, Object[] value, boolean ifstrict, CriteriaBuilder cb, Root<T> root) {
        System.out.println(value[0] + "=" + value[1]);
        if (value[1].getClass().getTypeName().equals("java.lang.String")) {
            if (ifstrict)
                predicates.add(cb.equal(root.get(value[0].toString()), value[1]));
            else
                predicates.add(cb.like(root.get(value[0].toString()), "%" + value[1] + "%"));
        } else
            predicates.add(cb.equal(root.get(value[0].toString()), value[1]));
    }

    public <T> CriteriaQuery<T> createPredicate(T object, String separator, CriteriaBuilder cb) throws Exception {
        try {
            Data_Service dataService = new Data_Service();
            ArrayList<Field> field = dataService.fieldTable(object);
            ArrayList<Object[]> infoAttr = dataService.info_fieldClass(field, object);
            Class<T> objectClass = (Class<T>) object.getClass();
            CriteriaQuery<T> cq = cb.createQuery(objectClass);

            Root<T> root = cq.from(objectClass);
            Predicate predicate = null;

            List<Predicate> predicates = new ArrayList<>();

            for (Object[] value : infoAttr)
                createCondition(predicates, value, false, cb, root);


            if (separator.equals("or"))
                predicate = cb.or(predicates.toArray(new Predicate[0]));
            else
                predicate = cb.and(predicates.toArray(new Predicate[0]));

            return cq.where(predicate);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
