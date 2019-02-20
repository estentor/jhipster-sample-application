package org.estentor.jhipster.application.repository.search;

import org.estentor.jhipster.application.domain.Genre;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Genre entity.
 */
public interface GenreSearchRepository extends ElasticsearchRepository<Genre, Long> {
}
