package org.estentor.jhipster.application.repository;

import org.estentor.jhipster.application.domain.Persons;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Persons entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonsRepository extends JpaRepository<Persons, Long> {

    @Query(value = "select distinct persons from Persons persons left join fetch persons.habilities",
        countQuery = "select count(distinct persons) from Persons persons")
    Page<Persons> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct persons from Persons persons left join fetch persons.habilities")
    List<Persons> findAllWithEagerRelationships();

    @Query("select persons from Persons persons left join fetch persons.habilities where persons.id =:id")
    Optional<Persons> findOneWithEagerRelationships(@Param("id") Long id);

}
