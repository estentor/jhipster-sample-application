package org.estentor.jhipster.application.web.rest;

import org.estentor.jhipster.application.JHipsterApp;

import org.estentor.jhipster.application.domain.Genre;
import org.estentor.jhipster.application.repository.GenreRepository;
import org.estentor.jhipster.application.repository.search.GenreSearchRepository;
import org.estentor.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
 * Test class for the GenreResource REST controller.
 *
 * @see GenreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JHipsterApp.class)
public class GenreResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private GenreRepository genreRepository;

    /**
     * This repository is mocked in the org.estentor.jhipster.application.repository.search test package.
     *
     * @see org.estentor.jhipster.application.repository.search.GenreSearchRepositoryMockConfiguration
     */
    @Autowired
    private GenreSearchRepository mockGenreSearchRepository;

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

    private MockMvc restGenreMockMvc;

    private Genre genre;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GenreResource genreResource = new GenreResource(genreRepository, mockGenreSearchRepository);
        this.restGenreMockMvc = MockMvcBuilders.standaloneSetup(genreResource)
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
    public static Genre createEntity(EntityManager em) {
        Genre genre = new Genre()
            .description(DEFAULT_DESCRIPTION);
        return genre;
    }

    @Before
    public void initTest() {
        genre = createEntity(em);
    }

    @Test
    @Transactional
    public void createGenre() throws Exception {
        int databaseSizeBeforeCreate = genreRepository.findAll().size();

        // Create the Genre
        restGenreMockMvc.perform(post("/api/genres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genre)))
            .andExpect(status().isCreated());

        // Validate the Genre in the database
        List<Genre> genreList = genreRepository.findAll();
        assertThat(genreList).hasSize(databaseSizeBeforeCreate + 1);
        Genre testGenre = genreList.get(genreList.size() - 1);
        assertThat(testGenre.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the Genre in Elasticsearch
        verify(mockGenreSearchRepository, times(1)).save(testGenre);
    }

    @Test
    @Transactional
    public void createGenreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = genreRepository.findAll().size();

        // Create the Genre with an existing ID
        genre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGenreMockMvc.perform(post("/api/genres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genre)))
            .andExpect(status().isBadRequest());

        // Validate the Genre in the database
        List<Genre> genreList = genreRepository.findAll();
        assertThat(genreList).hasSize(databaseSizeBeforeCreate);

        // Validate the Genre in Elasticsearch
        verify(mockGenreSearchRepository, times(0)).save(genre);
    }

    @Test
    @Transactional
    public void getAllGenres() throws Exception {
        // Initialize the database
        genreRepository.saveAndFlush(genre);

        // Get all the genreList
        restGenreMockMvc.perform(get("/api/genres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genre.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getGenre() throws Exception {
        // Initialize the database
        genreRepository.saveAndFlush(genre);

        // Get the genre
        restGenreMockMvc.perform(get("/api/genres/{id}", genre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(genre.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGenre() throws Exception {
        // Get the genre
        restGenreMockMvc.perform(get("/api/genres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGenre() throws Exception {
        // Initialize the database
        genreRepository.saveAndFlush(genre);

        int databaseSizeBeforeUpdate = genreRepository.findAll().size();

        // Update the genre
        Genre updatedGenre = genreRepository.findById(genre.getId()).get();
        // Disconnect from session so that the updates on updatedGenre are not directly saved in db
        em.detach(updatedGenre);
        updatedGenre
            .description(UPDATED_DESCRIPTION);

        restGenreMockMvc.perform(put("/api/genres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGenre)))
            .andExpect(status().isOk());

        // Validate the Genre in the database
        List<Genre> genreList = genreRepository.findAll();
        assertThat(genreList).hasSize(databaseSizeBeforeUpdate);
        Genre testGenre = genreList.get(genreList.size() - 1);
        assertThat(testGenre.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the Genre in Elasticsearch
        verify(mockGenreSearchRepository, times(1)).save(testGenre);
    }

    @Test
    @Transactional
    public void updateNonExistingGenre() throws Exception {
        int databaseSizeBeforeUpdate = genreRepository.findAll().size();

        // Create the Genre

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGenreMockMvc.perform(put("/api/genres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genre)))
            .andExpect(status().isBadRequest());

        // Validate the Genre in the database
        List<Genre> genreList = genreRepository.findAll();
        assertThat(genreList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Genre in Elasticsearch
        verify(mockGenreSearchRepository, times(0)).save(genre);
    }

    @Test
    @Transactional
    public void deleteGenre() throws Exception {
        // Initialize the database
        genreRepository.saveAndFlush(genre);

        int databaseSizeBeforeDelete = genreRepository.findAll().size();

        // Delete the genre
        restGenreMockMvc.perform(delete("/api/genres/{id}", genre.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Genre> genreList = genreRepository.findAll();
        assertThat(genreList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Genre in Elasticsearch
        verify(mockGenreSearchRepository, times(1)).deleteById(genre.getId());
    }

    @Test
    @Transactional
    public void searchGenre() throws Exception {
        // Initialize the database
        genreRepository.saveAndFlush(genre);
        when(mockGenreSearchRepository.search(queryStringQuery("id:" + genre.getId())))
            .thenReturn(Collections.singletonList(genre));
        // Search the genre
        restGenreMockMvc.perform(get("/api/_search/genres?query=id:" + genre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genre.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Genre.class);
        Genre genre1 = new Genre();
        genre1.setId(1L);
        Genre genre2 = new Genre();
        genre2.setId(genre1.getId());
        assertThat(genre1).isEqualTo(genre2);
        genre2.setId(2L);
        assertThat(genre1).isNotEqualTo(genre2);
        genre1.setId(null);
        assertThat(genre1).isNotEqualTo(genre2);
    }
}
