package com.example.serverapp.Controller;

import com.example.serverapp.Generalization.Main.CrudController;
import com.example.serverapp.Generalization.Main.CrudService;
import com.example.serverapp.Model.MainModel.DepenseArtistes;
import com.example.serverapp.Repository.Repo_DB;
import com.example.serverapp.Repository.Repo_DepenseArtistes;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(value = "/depenseartistes")
public class DepenseArticle_Controller extends CrudController<DepenseArtistes, Repo_DepenseArtistes, CrudService, Integer> {
    public DepenseArticle_Controller(Repo_DepenseArtistes repo, CrudService service, Repo_DB repo_db) {
        super(new DepenseArtistes(), repo, service, repo_db);
    }

}
