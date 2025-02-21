import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

// import { _posts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { PostItem } from '../post-item';
import { PostSort } from '../post-sort';
import { PostSearch } from '../post-search';

// ----------------------------------------------------------------------

export function BlogView() {
  const [sortBy, setSortBy] = useState('latest');
  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);


   const _posts = [...Array(3)].map((_, index) => ({
    id: (index),
    title: (index),
    description: (index),
    coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
    totalViews: 8829,
    totalComments: 7977,
    totalShares: 8556,
    totalFavorites: 8870,
    postedAt: (index),
    author: {
      name: (index),
      avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
    },
  }));

  useEffect(() => {
    console.log("user info")
    console.log(_posts)
  },[])

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          User Information "Static Data Sample purpose"
        </Typography>



      </Box> 

      
      <Grid container spacing={3}>
        {_posts.map((post, index) => {
          const latestPostLarge = index === 0;
          const latestPost = index === 1 || index === 2;

          return (
            <Grid key={post.id} xs={12} sm={latestPostLarge ? 12 : 12} md={latestPostLarge ? 6 : 3}>
              <PostItem post={post} latestPost={latestPost} latestPostLarge={latestPostLarge} />
            </Grid>
          );
        })}
      </Grid>

      {/* <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} /> */}
    </DashboardContent>
  );
}
