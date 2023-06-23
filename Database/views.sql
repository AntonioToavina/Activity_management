-- total depense artiste

CREATE OR REPLACE VIEW v_artistes as
select d.devis_id,sum(d.duree*a.tarif_heure)total from depenseartistes d join artistes a on d.artistes_id = a.id group by d.devis_id;

-- total lieu
CREATE OR REPLACE VIEW v_lieu as
select d.devis_id,sum(montant)total from depenselieu d group by d.devis_id;

-- total sono et logistiques
CREATE OR REPLACE VIEW v_element as
select devis_id,sum((duree*e.tarif)/t.frequence) total from depenseelements join elementbases e on depenseelements.elementbases_id = e.id join typeelements t on e.typeelement_id = t.id
group by devis_id;

--total autres depenses
CREATE OR REPLACE VIEW V_depensesdivers as
select devis_id,sum(montant) total from diversdepensedevis group by devis_id;

