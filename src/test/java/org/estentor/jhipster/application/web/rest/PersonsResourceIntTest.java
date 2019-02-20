package org.estentor.jhipster.application.web.rest;

import org.estentor.jhipster.application.JHipsterApp;

import org.estentor.jhipster.application.domain.Persons;
import org.estentor.jhipster.application.repository.PersonsRepository;
import org.estentor.jhipster.application.repository.search.PersonsSearchRepository;
import org.estentor.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
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
 * Test class for the PersonsResource REST controller.
 *
 * @see PersonsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JHipsterApp.class)
public class PersonsResourceIntTest {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_ARRIVAL_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ARRIVAL_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_RESIDENCY_STATUS = false;
    private static final Boolean UPDATED_RESIDENCY_STATUS = true;

    private static final String DEFAULT_DOCUMENT = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_NACIONALITY = "AAAAAAAAAA";
    private static final String UPDATED_NACIONALITY = "BBBBBBBBBB";

    @Autowired
    private PersonsRepository personsRepository;

    @Mock
    private PersonsRepository personsRepositoryMock;

    /**
     * This repository is mocked in the org.estentor.jhipster.application.repository.search test package.
     *
     * @see org.estentor.jhipster.application.repository.search.PersonsSearchRepositoryMockConfiguration
     */
    @Autowired
    private PersonsSearchRepository mockPersonsSearchRepository;

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

    private MockMvc restPersonsMockMvc;

    private Persons persons;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PersonsResource personsResource = new PersonsResource(personsRepository, mockPersonsSearchRepository);
        this.restPersonsMockMvc = MockMvcBuilders.standaloneSetup(personsResource)
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
    public static Persons createEntity(EntityManager em) {
        Persons persons = new Persons()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .arrivalDate(DEFAULT_ARRIVAL_DATE)
            .residencyStatus(DEFAULT_RESIDENCY_STATUS)
            .document(DEFAULT_DOCUMENT)
            .address(DEFAULT_ADDRESS)
            .nacionality(DEFAULT_NACIONALITY);
        return persons;
    }

    @Before
    public void initTest() {
        persons = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersons() throws Exception {
        int databaseSizeBeforeCreate = personsRepository.findAll().size();

        // Create the Persons
        restPersonsMockMvc.perform(post("/api/persons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(persons)))
            .andExpect(status().isCreated());

        // Validate the Persons in the database
        List<Persons> personsList = personsRepository.findAll();
        assertThat(personsList).hasSize(databaseSizeBeforeCreate + 1);
        Persons testPersons = personsList.get(personsList.size() - 1);
        assertThat(testPersons.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testPersons.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testPersons.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPersons.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testPersons.getArrivalDate()).isEqualTo(DEFAULT_ARRIVAL_DATE);
        assertThat(testPersons.isResidencyStatus()).isEqualTo(DEFAULT_RESIDENCY_STATUS);
        assertThat(testPersons.getDocument()).isEqualTo(DEFAULT_DOCUMENT);
        assertThat(testPersons.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testPersons.getNacionality()).isEqualTo(DEFAULT_NACIONALITY);

        // Validate the Persons in Elasticsearch
        verify(mockPersonsSearchRepository, times(1)).save(testPersons);
    }

    @Test
    @Transactional
    public void createPersonsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personsRepository.findAll().size();

        // Create the Persons with an existing ID
        persons.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonsMockMvc.perform(post("/api/persons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(persons)))
            .andExpect(status().isBadRequest());

        // Validate the Persons in the database
        List<Persons> personsList = personsRepository.findAll();
        assertThat(personsList).hasSize(databaseSizeBeforeCreate);

        // Validate the Persons in Elasticsearch
        verify(mockPersonsSearchRepository, times(0)).save(persons);
    }

    @Test
    @Transactional
    public void getAllPersons() throws Exception {
        // Initialize the database
        personsRepository.saveAndFlush(persons);

        // Get all the personsList
        restPersonsMockMvc.perform(get("/api/persons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(persons.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].arrivalDate").value(hasItem(DEFAULT_ARRIVAL_DATE.toString())))
            .andExpect(jsonPath("$.[*].residencyStatus").value(hasItem(DEFAULT_RESIDENCY_STATUS.booleanValue())))
            .andExpect(jsonPath("$.[*].document").value(hasItem(DEFAULT_DOCUMENT.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].nacionality").value(hasItem(DEFAULT_NACIONALITY.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPersonsWithEagerRelationshipsIsEnabled() throws Exception {
        PersonsResource personsResource = new PersonsResource(personsRepositoryMock, mockPersonsSearchRepository);
        when(personsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPersonsMockMvc = MockMvcBuilders.standaloneSetup(personsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPersonsMockMvc.perform(get("/api/persons?eagerload=true"))
        .andExpect(status().isOk());

        verify(personsRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPersonsWithEagerRelationshipsIsNotEnabled() throws Exception {
        PersonsResource personsResource = new PersonsResource(personsRepositoryMock, mockPersonsSearchRepository);
            when(personsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPersonsMockMvc = MockMvcBuilders.standaloneSetup(personsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPersonsMockMvc.perform(get("/api/persons?eagerload=true"))
        .andExpect(status().isOk());

            verify(personsRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPersons() throws Exception {
        // Initialize the database
        personsRepository.saveAndFlush(persons);

        // Get the persons
        restPersonsMockMvc.perform(get("/api/persons/{id}", persons.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(persons.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.arrivalDate").value(DEFAULT_ARRIVAL_DATE.toString()))
            .andExpect(jsonPath("$.residencyStatus").value(DEFAULT_RESIDENCY_STATUS.booleanValue()))
            .andExpect(jsonPath("$.document").value(DEFAULT_DOCUMENT.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.nacionality").value(DEFAULT_NACIONALITY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPersons() throws Exception {
        // Get the persons
        restPersonsMockMvc.perform(get("/api/persons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersons() throws Exception {
        // Initialize the database
        personsRepository.saveAndFlush(persons);

        int databaseSizeBeforeUpdate = personsRepository.findAll().size();

        // Update the persons
        Persons updatedPersons = personsRepository.findById(persons.getId()).get();
        // Disconnect from session so that the updates on updatedPersons are not directly saved in db
        em.detach(updatedPersons);
        updatedPersons
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .arrivalDate(UPDATED_ARRIVAL_DATE)
            .residencyStatus(UPDATED_RESIDENCY_STATUS)
            .document(UPDATED_DOCUMENT)
            .address(UPDATED_ADDRESS)
            .nacionality(UPDATED_NACIONALITY);

        restPersonsMockMvc.perform(put("/api/persons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPersons)))
            .andExpect(status().isOk());

        // Validate the Persons in the database
        List<Persons> personsList = personsRepository.findAll();
        assertThat(personsList).hasSize(databaseSizeBeforeUpdate);
        Persons testPersons = personsList.get(personsList.size() - 1);
        assertThat(testPersons.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testPersons.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testPersons.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPersons.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testPersons.getArrivalDate()).isEqualTo(UPDATED_ARRIVAL_DATE);
        assertThat(testPersons.isResidencyStatus()).isEqualTo(UPDATED_RESIDENCY_STATUS);
        assertThat(testPersons.getDocument()).isEqualTo(UPDATED_DOCUMENT);
        assertThat(testPersons.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testPersons.getNacionality()).isEqualTo(UPDATED_NACIONALITY);

        // Validate the Persons in Elasticsearch
        verify(mockPersonsSearchRepository, times(1)).save(testPersons);
    }

    @Test
    @Transactional
    public void updateNonExistingPersons() throws Exception {
        int databaseSizeBeforeUpdate = personsRepository.findAll().size();

        // Create the Persons

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonsMockMvc.perform(put("/api/persons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(persons)))
            .andExpect(status().isBadRequest());

        // Validate the Persons in the database
        List<Persons> personsList = personsRepository.findAll();
        assertThat(personsList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Persons in Elasticsearch
        verify(mockPersonsSearchRepository, times(0)).save(persons);
    }

    @Test
    @Transactional
    public void deletePersons() throws Exception {
        // Initialize the database
        personsRepository.saveAndFlush(persons);

        int databaseSizeBeforeDelete = personsRepository.findAll().size();

        // Delete the persons
        restPersonsMockMvc.perform(delete("/api/persons/{id}", persons.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Persons> personsList = personsRepository.findAll();
        assertThat(personsList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Persons in Elasticsearch
        verify(mockPersonsSearchRepository, times(1)).deleteById(persons.getId());
    }

    @Test
    @Transactional
    public void searchPersons() throws Exception {
        // Initialize the database
        personsRepository.saveAndFlush(persons);
        when(mockPersonsSearchRepository.search(queryStringQuery("id:" + persons.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(persons), PageRequest.of(0, 1), 1));
        // Search the persons
        restPersonsMockMvc.perform(get("/api/_search/persons?query=id:" + persons.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(persons.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].arrivalDate").value(hasItem(DEFAULT_ARRIVAL_DATE.toString())))
            .andExpect(jsonPath("$.[*].residencyStatus").value(hasItem(DEFAULT_RESIDENCY_STATUS.booleanValue())))
            .andExpect(jsonPath("$.[*].document").value(hasItem(DEFAULT_DOCUMENT)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].nacionality").value(hasItem(DEFAULT_NACIONALITY)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Persons.class);
        Persons persons1 = new Persons();
        persons1.setId(1L);
        Persons persons2 = new Persons();
        persons2.setId(persons1.getId());
        assertThat(persons1).isEqualTo(persons2);
        persons2.setId(2L);
        assertThat(persons1).isNotEqualTo(persons2);
        persons1.setId(null);
        assertThat(persons1).isNotEqualTo(persons2);
    }
}
