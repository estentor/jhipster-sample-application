package org.estentor.jhipster.application.web.rest;

import org.estentor.jhipster.application.JHipsterApp;

import org.estentor.jhipster.application.domain.Habilities;
import org.estentor.jhipster.application.repository.HabilitiesRepository;
import org.estentor.jhipster.application.repository.search.HabilitiesSearchRepository;
import org.estentor.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static org.estentor.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HabilitiesResource REST controller.
 *
 * @see HabilitiesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JHipsterApp.class)
public class HabilitiesResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private HabilitiesRepository habilitiesRepository;

    /**
     * This repository is mocked in the org.estentor.jhipster.application.repository.search test package.
     *
     * @see org.estentor.jhipster.application.repository.search.HabilitiesSearchRepositoryMockConfiguration
     */
    @Autowired
    private HabilitiesSearchRepository mockHabilitiesSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restHabilitiesMockMvc;

    private Habilities habilities;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HabilitiesResource habilitiesResource = new HabilitiesResource(habilitiesRepository, mockHabilitiesSearchRepository);
        this.restHabilitiesMockMvc = MockMvcBuilders.standaloneSetup(habilitiesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Habilities createEntity(EntityManager em) {
        Habilities habilities = new Habilities()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION);
        return habilities;
    }

    @Before
    public void initTest() {
        habilities = createEntity(em);
    }

    @Test
    @Transactional
    public void createHabilities() throws Exception {
        int databaseSizeBeforeCreate = habilitiesRepository.findAll().size();

        // Create the Habilities
        restHabilitiesMockMvc.perform(post("/api/habilities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilities)))
            .andExpect(status().isCreated());

        // Validate the Habilities in the database
        List<Habilities> habilitiesList = habilitiesRepository.findAll();
        assertThat(habilitiesList).hasSize(databaseSizeBeforeCreate + 1);
        Habilities testHabilities = habilitiesList.get(habilitiesList.size() - 1);
        assertThat(testHabilities.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testHabilities.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the Habilities in Elasticsearch
        verify(mockHabilitiesSearchRepository, times(1)).save(testHabilities);
    }

    @Test
    @Transactional
    public void createHabilitiesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = habilitiesRepository.findAll().size();

        // Create the Habilities with an existing ID
        habilities.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHabilitiesMockMvc.perform(post("/api/habilities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilities)))
            .andExpect(status().isBadRequest());

        // Validate the Habilities in the database
        List<Habilities> habilitiesList = habilitiesRepository.findAll();
        assertThat(habilitiesList).hasSize(databaseSizeBeforeCreate);

        // Validate the Habilities in Elasticsearch
        verify(mockHabilitiesSearchRepository, times(0)).save(habilities);
    }

    @Test
    @Transactional
    public void getAllHabilities() throws Exception {
        // Initialize the database
        habilitiesRepository.saveAndFlush(habilities);

        // Get all the habilitiesList
        restHabilitiesMockMvc.perform(get("/api/habilities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(habilities.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getHabilities() throws Exception {
        // Initialize the database
        habilitiesRepository.saveAndFlush(habilities);

        // Get the habilities
        restHabilitiesMockMvc.perform(get("/api/habilities/{id}", habilities.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(habilities.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHabilities() throws Exception {
        // Get the habilities
        restHabilitiesMockMvc.perform(get("/api/habilities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHabilities() throws Exception {
        // Initialize the database
        habilitiesRepository.saveAndFlush(habilities);

        int databaseSizeBeforeUpdate = habilitiesRepository.findAll().size();

        // Update the habilities
        Habilities updatedHabilities = habilitiesRepository.findById(habilities.getId()).get();
        // Disconnect from session so that the updates on updatedHabilities are not directly saved in db
        em.detach(updatedHabilities);
        updatedHabilities
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION);

        restHabilitiesMockMvc.perform(put("/api/habilities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHabilities)))
            .andExpect(status().isOk());

        // Validate the Habilities in the database
        List<Habilities> habilitiesList = habilitiesRepository.findAll();
        assertThat(habilitiesList).hasSize(databaseSizeBeforeUpdate);
        Habilities testHabilities = habilitiesList.get(habilitiesList.size() - 1);
        assertThat(testHabilities.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testHabilities.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the Habilities in Elasticsearch
        verify(mockHabilitiesSearchRepository, times(1)).save(testHabilities);
    }

    @Test
    @Transactional
    public void updateNonExistingHabilities() throws Exception {
        int databaseSizeBeforeUpdate = habilitiesRepository.findAll().size();

        // Create the Habilities

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHabilitiesMockMvc.perform(put("/api/habilities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilities)))
            .andExpect(status().isBadRequest());

        // Validate the Habilities in the database
        List<Habilities> habilitiesList = habilitiesRepository.findAll();
        assertThat(habilitiesList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Habilities in Elasticsearch
        verify(mockHabilitiesSearchRepository, times(0)).save(habilities);
    }

    @Test
    @Transactional
    public void deleteHabilities() throws Exception {
        // Initialize the database
        habilitiesRepository.saveAndFlush(habilities);

        int databaseSizeBeforeDelete = habilitiesRepository.findAll().size();

        // Delete the habilities
        restHabilitiesMockMvc.perform(delete("/api/habilities/{id}", habilities.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Habilities> habilitiesList = habilitiesRepository.findAll();
        assertThat(habilitiesList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Habilities in Elasticsearch
        verify(mockHabilitiesSearchRepository, times(1)).deleteById(habilities.getId());
    }

    @Test
    @Transactional
    public void searchHabilities() throws Exception {
        // Initialize the database
        habilitiesRepository.saveAndFlush(habilities);
        when(mockHabilitiesSearchRepository.search(queryStringQuery("id:" + habilities.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(habilities), PageRequest.of(0, 1), 1));
        // Search the habilities
        restHabilitiesMockMvc.perform(get("/api/_search/habilities?query=id:" + habilities.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(habilities.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Habilities.class);
        Habilities habilities1 = new Habilities();
        habilities1.setId(1L);
        Habilities habilities2 = new Habilities();
        habilities2.setId(habilities1.getId());
        assertThat(habilities1).isEqualTo(habilities2);
        habilities2.setId(2L);
        assertThat(habilities1).isNotEqualTo(habilities2);
        habilities1.setId(null);
        assertThat(habilities1).isNotEqualTo(habilities2);
    }
}
