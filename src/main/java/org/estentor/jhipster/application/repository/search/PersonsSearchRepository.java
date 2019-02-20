package org.estentor.jhipster.application.repository.search;

import org.estentor.jhipster.application.domain.Persons;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Persons entity.
 */
public interface PersonsSearchRepository extends ElasticsearchRepository<Persons, Long> {
}
