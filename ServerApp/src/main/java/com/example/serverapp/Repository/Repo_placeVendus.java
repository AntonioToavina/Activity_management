package com.example.serverapp.Repository;

import com.example.serverapp.Model.MainModel.PlaceVendus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Repo_placeVendus extends JpaRepository<PlaceVendus, Integer> {

    @Query(value = "Select * from placevendus where devis_id=?1", nativeQuery = true)
    List<PlaceVendus> findDevis(int id);
}
