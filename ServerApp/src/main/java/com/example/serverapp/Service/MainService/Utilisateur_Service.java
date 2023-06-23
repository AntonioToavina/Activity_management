package com.example.serverapp.Service.MainService;

import com.example.serverapp.Generalization.Main.CrudService;
import com.example.serverapp.Generalization.Main.Data_DB;
import com.example.serverapp.Generalization.Service.PDF_Service;
import com.example.serverapp.Model.MainModel.Utilisateurs;
import com.example.serverapp.Repository.Repo_DB;

import java.util.List;

public class Utilisateur_Service extends CrudService {
    public Utilisateur_Service(PDF_Service pdf_service) {
        super(pdf_service);
    }

    public Utilisateurs login(Repo_DB repo_db, Utilisateurs user) throws Exception {
        try {
            if (user.getEmail() == null || user.getMdp() == null)
                throw new Exception("Erreur: Tous les champs sont obligatoires");

            List<Object> list = new Data_DB().find(user, repo_db, true, -2, null);

            if (!list.isEmpty())
                user = (Utilisateurs) list.get(0);
            else
                throw new Exception("Erreur lors de l'authentification ");

        } catch (Exception e) {
            throw e;
        }
        return user;
    }

}
