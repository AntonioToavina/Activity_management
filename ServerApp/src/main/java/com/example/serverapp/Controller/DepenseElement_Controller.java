package com.example.serverapp.Controller;

import com.example.serverapp.Generalization.Main.CrudController;
import com.example.serverapp.Generalization.Main.CrudService;
import com.example.serverapp.Model.MainModel.DepenseElements;
import com.example.serverapp.Repository.Repo_DB;
import com.example.serverapp.Repository.Repo_DepenseElements;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(value = "/depenseselements")
public class DepenseElement_Controller extends CrudController<DepenseElements, Repo_DepenseElements, CrudService, Integer> {
    public DepenseElement_Controller(Repo_DepenseElements repo, CrudService service, Repo_DB repo_db) {
        super(new DepenseElements(), repo, service, repo_db);
    }
}
