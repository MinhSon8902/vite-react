import React from 'react';
import AlbumList from './components/AlbumList';

function AlbumFeature(props) {
  const albumList = [
    {
      id: 1,
      name: 'Nhạc hoa thịnh hành',
      thumbnailUrl:
        'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/6/3/e/6/63e62a1fc9bcad0e24cc5e18e3736b7a.jpg',
    },
    {
      id: 2,
      name: 'Nhạc US thịnh hành',
      thumbnailUrl:
        'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/0/c/3/2/0c326e7f586971c499e690ff99674957.jpg',
    },
    {
      id: 3,
      name: 'Nhạc UK thịnh hành',
      thumbnailUrl:
        'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/b/8/9/2/b892f4af3fa0a112d3551cbd05d89343.jpg',
    },
  ];
  return (
    <div>
      <h2>Xin chào bạn đã đến với thế giới âm nhạc</h2>
      <AlbumList albumList={albumList} />
    </div>
  );
}

AlbumFeature.propTypes = {};

export default AlbumFeature;
