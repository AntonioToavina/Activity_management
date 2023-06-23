package com.example.serverapp.Repository;

import com.example.serverapp.Model.MainModel.Utilisateurs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Repo_Utilisateur extends JpaRepository<Utilisateurs, Integer> {

    @Query(value = "SELECT * from v_utilisateurs", nativeQuery = true)
    List<Utilisateurs> getUtilisateurs();
}
