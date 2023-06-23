package com.example.serverapp.Controller;

import com.example.serverapp.Generalization.Main.CrudController;
import com.example.serverapp.Generalization.Main.CrudService;
import com.example.serverapp.Generalization.Service.PDF_Service;
import com.example.serverapp.Model.MainModel.TypeDepenses;
import com.example.serverapp.Repository.Repo_DB;
import com.example.serverapp.Repository.Repo_Typedepense;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(value = "/autresdepenses")
public class Depense_Controller extends CrudController<TypeDepenses, Repo_Typedepense, CrudService, Integer> {
    public Depense_Controller(Repo_Typedepense repo, Repo_DB repo_db) {
        super(new TypeDepenses(), repo, new CrudService(new PDF_Service()), repo_db);
    }
}
