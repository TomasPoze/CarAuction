package lt.codeacademy.Car.auction.services;

import lt.codeacademy.Car.auction.entities.Post;
import lt.codeacademy.Car.auction.repositories.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostsService {
    private PostRepository postRepository;

    public PostsService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }
}