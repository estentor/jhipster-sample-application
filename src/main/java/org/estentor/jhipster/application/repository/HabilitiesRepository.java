package org.estentor.jhipster.application.repository;

import org.estentor.jhipster.application.domain.Habilities;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Habilities entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HabilitiesRepository extends JpaRepository<Habilities, Long> {

}
