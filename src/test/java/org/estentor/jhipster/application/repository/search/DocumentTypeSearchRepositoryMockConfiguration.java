package org.estentor.jhipster.application.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of DocumentTypeSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class DocumentTypeSearchRepositoryMockConfiguration {

    @MockBean
    private DocumentTypeSearchRepository mockDocumentTypeSearchRepository;

}
