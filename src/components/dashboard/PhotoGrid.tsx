import '../../scss/photo-grid.scss';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Image as AntImage, Spin } from 'antd';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import PhotoThumbnail from './PhotoThumbnail';
import FloatingButton from './FloatingButton';
import ImageUploadModal from '../ImageUploadModal';
import { useGroupsState } from '../../hooks/group';
import { useLoading } from '../../hooks/loading';
import emptySvg from '../../assets/no-photos.svg';
import { Image } from '../../types';

const item = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 },
};

type PhotoGridProps = {
  photos: Image[];
  isGroupOwner: boolean;
};

function PhotoGrid({ photos = [], isGroupOwner = false } : PhotoGridProps): JSX.Element {
  const [isUploadModalVisible, setUploadModalVisible] = useState(false);
  const openUploadModal = () => setUploadModalVisible(true);
  const closeUploadModal = () => setUploadModalVisible(false);
  const { groups } = useGroupsState();
  const { imagesLoading } = useLoading();

  const emptyContainer = (
    <div className="empty-overlay">
      <img
        src={emptySvg}
        className="empty-img"
        alt={groups.length === 0 ? 'empty group' : 'no photos'}
      />
      <h2 className="title">It&apos;s empty in here!</h2>
      <p className="description">
        {groups.length === 0
          ? 'Create or join a group to get this party started.'
          : 'Upload an image or invite some friends to the party.'}
      </p>
    </div>
  );

  const photoGrid = (
    <AntImage.PreviewGroup>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial={{
            opacity: 0,
            y: '25%',
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: '25%',
          }}
          transition={{
            duration: 0.7,
            type: 'spring',
            bounce: 0.25,
          }}
        >
          <div className="photo-grid">
            {photos.map(photo => (
              <motion.div key={photo.URL} variants={item}>
                <PhotoThumbnail
                  isGroupOwner={isGroupOwner}
                  key={photo.URL}
                  src={photo.URL}
                  caption={photo.caption}
                  creatorId={photo.creator}
                  imageId={photo.id}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </AntImage.PreviewGroup>
  );

  if (imagesLoading) {
    return (
      <div className="photo-grid-container loading">
        <Spin size="large" tip="Loading images..." />
      </div>
    );
  }

  return (
    <div className="photo-grid-container">
      {photos.length === 0 ? emptyContainer : photoGrid}
      {groups.length > 0 && (
        <FloatingButton onClick={openUploadModal}>
          <AiOutlineCloudUpload size={32} color="#525252" />
        </FloatingButton>
      )}
      <ImageUploadModal
        visible={isUploadModalVisible}
        onClose={closeUploadModal}
      />
    </div>
  );
}

export default PhotoGrid;
