import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/phamsodiep/fika_scrum"
      >
        Pham Duc Huy - phamsodiep.blogspot.com
      </Link>{' '}
      2020.
    </Typography>
  );
}

