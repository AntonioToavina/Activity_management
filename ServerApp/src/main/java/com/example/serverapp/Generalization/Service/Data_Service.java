package com.example.serverapp.Generalization.Service;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import java.beans.PropertyDescriptor;
import java.beans.Transient;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;

public class Data_Service {

    public Object objectValue(Field f, Object o)
            throws Exception {
        try {
            PropertyDescriptor pd = new PropertyDescriptor(f.getName(), o.getClass());
            Method getter = pd.getReadMethod();
            return getter.invoke(o);
        } catch (Throwable e) {
            e.printStackTrace();
            throw new Exception("Error in function objectValue", e);
        }
    }

    public ArrayList<Field> fieldTable(Object o) {
        if (o == null)
            return null;
        Field[] fields = o.getClass().getDeclaredFields();
        ArrayList<Field> newField = new ArrayList<>();

        for (Field f : fields) {
            if (!f.isAnnotationPresent(Transient.class))
                newField.add(f);
        }

        return newField;
    }

    public Field getPk(Object obj) throws Exception {
        try {
            ArrayList<Field> list = fieldTable(obj);
            if (list == null)
                return null;
            for (Field field : list) {
                if (field.isAnnotationPresent(Id.class))
                    return field;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Error on getPk :" + e.getMessage());
        }
        return null;
    }

    public ArrayList<Object[]> valueFk(Field field, Object obj) throws Exception {
        ArrayList<Object[]> infoAttr = new ArrayList<>();
        try {
            Object objFk = objectValue(field, obj);
            if (objFk == null)
                return infoAttr;

            Field fieldPK = getPk(objFk);
            if (fieldPK == null)
                return null;
            Object[] value = {field.getName(), objectValue(fieldPK, objFk)};
            if (checkValue_Field(field, value[1]))
                infoAttr.add(value);

            /*
            ArrayList<Field> list = fieldTable(objFk);
            if (!list.isEmpty()) {
                for (Field f : list) {
                    if (f.isAnnotationPresent(JoinColumn.class)) {
                        Object o = objectValue(f, objFk);
                        Field f1 = getPk(o);
                        Object[] value1 = {f.getAnnotation(JoinColumn.class).name(), objectValue(f1, o)};
                        if (checkValue_Field(f1, value1[1]))
                            infoAttr.add(value1);
                    }
                }
            }*/
            return infoAttr;
        } catch (Exception e) {
            throw e;
        }
    }

    public boolean checkValue_Field(Field field, Object value) {
        if (value != null) {
            if (field.getType().equals(Integer.class) || field.getType().equals(int.class))
                return (Integer.parseInt(value.toString()) != 0);

            if (field.getType().equals(double.class))
                return Double.parseDouble(value.toString()) != 0;

            if (field.getType().equals(String.class))
                return !value.toString().equals("");

            return true;
        }

        return false;
    }

    public void valueAttr(Object obj, Field field, ArrayList<Object[]> listValue) throws Exception {
        try {
            Object[] value = new Object[2];
            if (field.isAnnotationPresent(JoinColumn.class))
                listValue.addAll(valueFk(field, obj));
            else {
                value[0] = field.getName().toLowerCase();
                value[1] = objectValue(field, obj);
            }

            if (checkValue_Field(field, value[1]))
                listValue.add(value);
        } catch (Exception e) {
            throw e;
        }
    }

    public ArrayList<Object[]> info_fieldClass(ArrayList<Field> field, Object o) throws Exception {
        ArrayList<Object[]> infoAttr = new ArrayList<>();
        try {
            for (Field f : field)
                valueAttr(o, f, infoAttr);

            return infoAttr;
        } catch (Exception e) {
            throw e;
        }
    }

    public String buildwith_Operator(Object[] value, Boolean ifstrict) {
        String response = "";
        if (value[1].getClass().getTypeName().equals("java.lang.String")) {
            if (ifstrict)
                response = value[0] + " = '" + value[1] + "'";
            else
                response = value[0] + " like '%" + value[1] + "%'";
        } else
            response = value[0] + "=" + value[1];

        return response;
    }

    public String createScript(Object obj, Boolean ifstrict, String table) throws Exception {
        StringBuilder value = new StringBuilder(" ");

        String tableName = obj.getClass().getSimpleName();
        if (table != null) {
            tableName = table;
        }

        int count = 0;
        ArrayList<Field> field = fieldTable(obj);
        ArrayList<Object[]> infoAttr = null;

        try {
            infoAttr = info_fieldClass(field, obj);

            for (Object[] val : infoAttr) {
                value.append(" and ");
                value.append(buildwith_Operator(val, ifstrict));
                count++;
            }
        } catch (Exception e) {
            throw e;
        }

        if (value.toString().equals(" "))
            return "SELECT a FROM " + tableName + " a";
        return "SELECT a FROM " + tableName + " a where 1=1 " + value.toString();
    }
}
