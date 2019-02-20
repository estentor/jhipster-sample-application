package org.estentor.jhipster.application.repository.search;

import org.estentor.jhipster.application.domain.Habilities;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Habilities entity.
 */
public interface HabilitiesSearchRepository extends ElasticsearchRepository<Habilities, Long> {
}
