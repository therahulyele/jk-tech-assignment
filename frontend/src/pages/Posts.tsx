import { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await api.getPosts();
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button
        component={Link}
        to="/posts/create"
        variant="contained"
        sx={{ mb: 4 }}
      >
        Create New Post
      </Button>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to={`/posts/${post.id}`} size="small">
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};