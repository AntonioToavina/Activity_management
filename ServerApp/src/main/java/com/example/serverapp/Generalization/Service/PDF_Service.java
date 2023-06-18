package com.example.serverapp.Generalization.Service;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import javax.persistence.JoinColumn;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@Service
public class PDF_Service {
    ArrayList<String> headers = new ArrayList<>();
    boolean ifSet = false;


    public String getTitle(Object obj) {
        return "Listes des " + obj.getClass().getSimpleName();
    }

    public Font getFont() {
        return new Font(Font.FontFamily.TIMES_ROMAN, 25, Font.BOLD);
    }

    public void setDimension(PdfPTable table) {
        table.setWidthPercentage(100f);
        table.setHorizontalAlignment(0);
        table.setSpacingAfter(20);
    }

    public void valueAttr(Object obj, Field field, ArrayList<Object> listValue) throws Exception {
        ArrayList<Object> valueList = new ArrayList<>();
        try {
            if (field.isAnnotationPresent(JoinColumn.class)) {
                Object o = new Data_Service().objectValue(field, obj);
                getField_Display(o, listValue);
            } else
                listValue.add(new Data_Service().objectValue(field, obj));
        } catch (Exception e) {
            throw e;
        }
    }

    public String getColumn_name(Field field) {
        String name = field.getName();
        if (!field.getAnnotation(PDF_Column.class).name().equals(""))
            name = field.getAnnotation(PDF_Column.class).name();

        return name;
    }

    public void getField_Display(Object obj, ArrayList<Object> listValue) throws Exception {
        Field[] fields = obj.getClass().getDeclaredFields();

        for (Field f : fields) {
            if (f.isAnnotationPresent(PDF_Column.class)) {
                valueAttr(obj, f, listValue);
                if (!this.ifSet && !f.isAnnotationPresent(JoinColumn.class))
                    this.headers.add(getColumn_name(f).toUpperCase());
            }
        }
    }

    public void addText(Document document, String title, Font font, int align, boolean setSpace) throws DocumentException {
        Paragraph paragraph = new Paragraph(title, font);
        paragraph.setAlignment(align);
        if (setSpace)
            paragraph.setSpacingAfter(20);
        document.add(paragraph);
    }

    public void addTitle(Document document, Object obj) throws DocumentException {
        document.addTitle(this.getTitle(obj));
        addText(document, this.getTitle(obj), this.getFont(), 1, true);
    }

    public void addTable(ArrayList<Object> values, Document document) throws DocumentException {
        PdfPTable table = new PdfPTable(this.headers.size());
        this.setDimension(table);

        for (String h : this.headers)
            table.addCell(h);

        for (Object value : values)
            table.addCell(String.valueOf(value));

        document.add(table);
    }


    public ByteArrayInputStream createPDF(ArrayList<Object> valueList, Object obj) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document();
        try {
            PdfWriter.getInstance(document, baos);
            document.open();

            this.addTitle(document, obj);
            addTable(valueList, document);
            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(baos.toByteArray());
    }

    public <T> ByteArrayInputStream generate(List<T> lists, T object) throws Exception {
        ArrayList<Object> listValue = new ArrayList<>();

        for (T obj : lists) {
            getField_Display(obj, listValue);
            this.ifSet = true;
        }
        return createPDF(listValue, object);
    }
}
