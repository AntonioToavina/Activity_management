package com.example.serverapp.Service.MainService;

import com.example.serverapp.Generalization.Service.PDF_Service;
import com.example.serverapp.Model.MainModel.*;
import com.example.serverapp.Model.ViewModel.DevisSpectacle;
import com.example.serverapp.Model.ViewModel.V_devis;
import com.example.serverapp.Repository.*;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.core.io.InputStreamResource;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

public class Devis_Service {

    public double getTotal(DevisSpectacle devisSpectacle) throws Exception {
        try {
            double totat = 0;

            // depense artiste
            for (DepenseArtistes depenseArtistes : devisSpectacle.getArtistes())
                totat += depenseArtistes.getDuree() * depenseArtistes.getArtistes().getTarif_heure();

            // depense element
            for (DepenseElements depenseElements : devisSpectacle.getDepenseElements())
                totat += (depenseElements.getDuree() * depenseElements.getElementbases().getTarif()) / depenseElements.getElementbases().getTypeelements().getFrequence();

            // depense place
            for (DepenseLieu depenseLieu : devisSpectacle.getDepenseLieus())
                totat += depenseLieu.getMontant();

            // depense divers
            for (Depensedivers depensedivers : devisSpectacle.getDepensedivers())
                totat += depensedivers.getMontant();

            return totat;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public double getRecette(List<DepenseLieu> depenseLieu) throws Exception {
        try {
            double recette = 0;
            for (DepenseLieu depenseLieu1 : depenseLieu)
                recette += depenseLieu1.getPrix_normal() * depenseLieu1.getLieu().getNormal_vip() + depenseLieu1.getPrix_vip() * depenseLieu1.getLieu().getVip_place() + depenseLieu1.getPrix_reserve() * depenseLieu1.getLieu().getReserve_place();

            return recette;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public void createDevis(DevisSpectacle devisSpectacle, Repo_devis repo_devis, Repo_DepenseArtistes repo_depenseArtistes, Repo_DepenseElements repo_depenseElements, Repo_DepenseDivers repo_depenseDivers, Repo_DepenseLieu repo_depenseLieu) throws Exception {
        try {
            System.out.println(devisSpectacle.getDevis().getLibelle());

            // Calculer le total
            devisSpectacle.getDevis().setTotal(getTotal(devisSpectacle));
            devisSpectacle.getDevis().setRecette(getRecette(devisSpectacle.getDepenseLieus()));
            devisSpectacle.getDevis().setBenefice(devisSpectacle.getDevis().getRecette() - devisSpectacle.getDevis().getTotal());

            // Save devis
            Devis devis = repo_devis.save(devisSpectacle.getDevis());

            // save depense artiste
            for (DepenseArtistes depenseArtistes : devisSpectacle.getArtistes()) {
                System.out.println(depenseArtistes.getDuree());
                depenseArtistes.setDevis(devis);
                repo_depenseArtistes.save(depenseArtistes);
            }

            //save place
            for (DepenseLieu depenseLieu : devisSpectacle.getDepenseLieus()) {
                depenseLieu.setDevis(devis);
                repo_depenseLieu.save(depenseLieu);
            }

            // save depense element
            for (DepenseElements depenseElements : devisSpectacle.getDepenseElements()) {
                System.out.println(depenseElements.getDuree());
                depenseElements.setDevis(devis);
                repo_depenseElements.save(depenseElements);
            }


            //save depense divers
            for (Depensedivers depensedivers : devisSpectacle.getDepensedivers()) {
                System.out.println(depensedivers.getMontant());
                depensedivers.setDevis(devis);
                repo_depenseDivers.save(depensedivers);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
    }

    public void addImage(String url, Document document) throws DocumentException, IOException {
        byte[] imageBytes = Base64.getDecoder().decode(url);

        Image image = Image.getInstance(imageBytes);
        image.scaleAbsolute(150, 150);
        image.setAlignment(Image.ALIGN_CENTER);

        document.add(image);
    }

    public void addArtistes(List<DepenseArtistes> depenseArtistes, Document document) throws DocumentException, IOException {
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(50f);
        table.setHorizontalAlignment(0);
        table.setSpacingAfter(20);

        for (DepenseArtistes depenseArtistes1 : depenseArtistes) {
            byte[] imageBytes = Base64.getDecoder().decode(depenseArtistes1.getArtistes().getPhoto().split(",")[1]);

            Image image = Image.getInstance(imageBytes);
            image.scaleAbsolute(75, 75);
            PdfPCell cell1 = new PdfPCell(image);
            PdfPCell cell2 = new PdfPCell(new Paragraph(depenseArtistes1.getArtistes().getNom(), new Font(Font.FontFamily.TIMES_ROMAN, 18, Font.NORMAL)));

            cell1.setBorder(Rectangle.NO_BORDER);
            cell2.setBorder(Rectangle.NO_BORDER);
            table.addCell(cell1);
            table.addCell(cell2);
        }
        table.setHorizontalAlignment(PdfPTable.ALIGN_CENTER);

        document.add(table);
    }

    public InputStreamResource generatePDF(int iddevis, Repo_V_devis repo_v_devis) throws DocumentException, IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document();
        PDF_Service pdf_service = new PDF_Service();

        try {
            Optional<V_devis> optional = repo_v_devis.findById(iddevis);
            V_devis v_devis = optional.orElse(null);

            PdfWriter.getInstance(document, baos);
            document.open();

            document.addTitle("Devis");
            pdf_service.addText(document, v_devis.getLibelle(), pdf_service.getFont(), 1, true);

            LocalDate date = LocalDate.parse(v_devis.getDatedevis().toString());
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMMM yyyy", Locale.FRENCH);
            String formattedDate = date.format(formatter);
            pdf_service.addText(document, "Le " + formattedDate + " à partir de " + v_devis.getHeure() + " au " + v_devis.getDepenseLieuList().get(0).getLieu().getNom(), new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.NORMAL), 1, true);


            String url = v_devis.getDepenseLieuList().get(0).getLieu().getPhoto().split(",")[1];
            addImage(url, document);

            pdf_service.addText(document, "Artistes", new Font(Font.FontFamily.TIMES_ROMAN, 20, Font.BOLD), 1, true);
            addArtistes(v_devis.getDepenseArtistesList(), document);

            pdf_service.addText(document, "Tarif", new Font(Font.FontFamily.TIMES_ROMAN, 20, Font.BOLD), 1, true);
            pdf_service.addText(document, "VIP : " + v_devis.getDepenseLieuList().get(0).getPrix_vip() + " Ar", new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.NORMAL), 1, true);
            pdf_service.addText(document, "Reservation : " + v_devis.getDepenseLieuList().get(0).getPrix_reserve() + " Ar", new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.NORMAL), 1, true);
            pdf_service.addText(document, "Normal : " + v_devis.getDepenseLieuList().get(0).getPrix_normal() + " Ar", new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.NORMAL), 1, true);

            document.close();
        } catch (Exception e) {
            throw e;
        }
        return new InputStreamResource(new ByteArrayInputStream(baos.toByteArray()));
    }

    public void setBenefice_net(int id, Repo_V_devis repo_v_devis, Repo_placeVendus repo_placeVendus, Repo_taxe repo_taxe, Repo_devis repo_devis) {
        try {
            Optional<V_devis> optional = repo_v_devis.findById(id);
            V_devis v_devis = optional.orElse(null);
            PlaceVendus placeVendus = v_devis.getPlaceVendus().get(0);
            DepenseLieu depenseLieu = v_devis.getDepenseLieuList().get(0);
            Taxe taxe = repo_taxe.findAll().get(0);

            double beneficePlace = depenseLieu.getPrix_vip() * placeVendus.getVip_place() + depenseLieu.getPrix_reserve() * placeVendus.getReserve_place() + depenseLieu.getPrix_normal() * placeVendus.getNormal_place();
            v_devis.setRecette(beneficePlace);
            v_devis.setBenefice(v_devis.getRecette() - v_devis.getTotal());
            double benefice_net = v_devis.getRecette() - v_devis.getTotal();
            v_devis.setBenefice_net(benefice_net - ((benefice_net * taxe.getPourcentage())));
            Devis devis = new Devis(v_devis.getId(), v_devis.getLibelle(), v_devis.getDuree(), v_devis.getDatedevis(), v_devis.getTotal(), v_devis.getHeure(), v_devis.getRecette(), v_devis.getBenefice(), v_devis.getBenefice_net());

            repo_devis.save(devis);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
