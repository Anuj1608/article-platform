package com.articleplatform.controller;

import com.articleplatform.dto.request.CreateArticleRequest;
import com.articleplatform.dto.request.LoginRequest;
import com.articleplatform.dto.request.RegisterRequest;
import com.articleplatform.repository.ArticleRepository;
import com.articleplatform.repository.ReactionRepository;
import com.articleplatform.repository.TagRepository;
import com.articleplatform.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for {@link ArticleController} and {@link LikeController}.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ArticleControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ReactionRepository reactionRepository;

    @Autowired
    private TagRepository tagRepository;

    @BeforeEach
    void setUp() {
        tagRepository.deleteAll();
        reactionRepository.deleteAll();
        articleRepository.deleteAll();
        userRepository.deleteAll();
    }

    private String registerAndGetToken(String username, String email) throws Exception {
        RegisterRequest reg = new RegisterRequest(username, email, "password123");
        MvcResult regResult = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reg)))
                .andReturn();
        JsonNode root = objectMapper.readTree(regResult.getResponse().getContentAsString());
        return root.path("data").path("token").asText();
    }

    @Test
    void getArticles_noAuth_returns200() throws Exception {
        mockMvc.perform(get("/api/articles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray());
    }

    @Test
    void createArticle_withoutAuth_returns401() throws Exception {
        CreateArticleRequest request = new CreateArticleRequest("Title", "Body text");
        mockMvc.perform(post("/api/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void createArticle_withAuth_returns201() throws Exception {
        String token = registerAndGetToken("creator", "creator@example.com");
        CreateArticleRequest request = new CreateArticleRequest("My Title", "My article body");

        mockMvc.perform(post("/api/articles")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("My Title"))
                .andExpect(jsonPath("$.data.author.username").value("creator"));
    }

    @Test
    void likeArticle_togglesReactionAndReturnsReactionResponse() throws Exception {
        String token = registerAndGetToken("likeuser", "like@example.com");

        CreateArticleRequest articleRequest = new CreateArticleRequest("Like Test", "Body");
        MvcResult createResult = mockMvc.perform(post("/api/articles")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(articleRequest)))
                .andExpect(status().isCreated())
                .andReturn();
        JsonNode articleNode = objectMapper.readTree(createResult.getResponse().getContentAsString());
        long articleId = articleNode.path("data").path("id").asLong();

        // First like — should add the reaction
        mockMvc.perform(post("/api/articles/" + articleId + "/like")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.likeCount").value(1))
                .andExpect(jsonPath("$.data.userReaction").value("LIKE"));

        // Second like on same article — should remove the reaction (toggle)
        mockMvc.perform(post("/api/articles/" + articleId + "/like")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.likeCount").value(0));
    }

    @Test
    void getArticle_byId_returns200() throws Exception {
        String token = registerAndGetToken("author", "author@example.com");
        CreateArticleRequest request = new CreateArticleRequest("Detail Test", "Article body content");

        MvcResult createResult = mockMvc.perform(post("/api/articles")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andReturn();
        JsonNode articleNode = objectMapper.readTree(createResult.getResponse().getContentAsString());
        long articleId = articleNode.path("data").path("id").asLong();

        mockMvc.perform(get("/api/articles/" + articleId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value("Detail Test"))
                .andExpect(jsonPath("$.data.body").value("Article body content"));
    }
}
