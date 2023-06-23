package com.example.serverapp.Service.MainService;

import com.example.serverapp.Model.MainModel.PlaceVendus;
import com.example.serverapp.Repository.Repo_placeVendus;

import java.util.List;

public class PlaceVendus_Service {

    public void createPlaceVendus(Repo_placeVendus repo_placeVendus, PlaceVendus placeVendus) {
        List<PlaceVendus> listplacevendus = repo_placeVendus.findDevis(placeVendus.getDevis().getId());
        if (listplacevendus.size() != 0) {
            placeVendus.setId(listplacevendus.get(0).getId());
        }
        repo_placeVendus.save(placeVendus);
    }
}
