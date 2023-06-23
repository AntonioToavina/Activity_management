package com.example.serverapp.Repository;

import com.example.serverapp.Model.MainModel.Artistes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Repo_artiste extends JpaRepository<Artistes, Integer> {
}
