package org.estentor.jhipster.application.repository.search;

import org.estentor.jhipster.application.domain.DocumentType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DocumentType entity.
 */
public interface DocumentTypeSearchRepository extends ElasticsearchRepository<DocumentType, Long> {
}
