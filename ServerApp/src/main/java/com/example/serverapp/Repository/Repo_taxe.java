package com.example.serverapp.Repository;

import com.example.serverapp.Model.MainModel.Taxe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Repo_taxe extends JpaRepository<Taxe, Integer> {
}
