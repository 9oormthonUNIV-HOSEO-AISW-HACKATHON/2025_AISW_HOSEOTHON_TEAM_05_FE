import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f0ff 0%, #ffffff 100%);
  padding-bottom: 40px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: transparent;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  
  &:hover {
    opacity: 0.7;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const ActionButton = styled.button<{ variant: 'purple' | 'orange' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: white;
  background: ${props => props.variant === 'purple' 
    ? 'linear-gradient(135deg, #9b7fff 0%, #7b5fff 100%)' 
    : 'linear-gradient(135deg, #ff8a65 0%, #ff7043 100%)'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const MainContent = styled.main`
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FeedHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  padding-top: 20px;
`;

export const CameraIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ff8a65 0%, #ff7043 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(255, 138, 101, 0.3);
  
  svg {
    width: 40px;
    height: 40px;
    color: white;
  }
`;

export const FeedTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
`;

export const FeedDescription = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  line-height: 1.5;
`;

export const ChallengesSection = styled.section`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  
  svg {
    width: 24px;
    height: 24px;
    color: #ff8a65;
  }
`;

export const ChallengesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ChallengeCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

export const ChallengeIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  background: ${props => props.color};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

export const ChallengeCategory = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #7b5fff;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ChallengeTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.4;
`;

export const ChallengeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

export const PointsTag = styled.span`
  background: linear-gradient(135deg, #ffd54f 0%, #ffc107 100%);
  color: #333;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

export const ParticipateButton = styled.button`
  background: none;
  border: none;
  color: #7b5fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    color: #9b7fff;
  }
`;

export const InfoBox = styled.div`
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
`;

export const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 2px;
  
  svg {
    width: 18px;
    height: 18px;
    color: #9c27b0;
  }
`;

export const InfoContent = styled.div`
  flex: 1;
`;

export const InfoTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const InfoText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

export const NavigationTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  background: white;
  padding: 6px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: ${props => props.active ? '#f5f5f5' : 'transparent'};
  color: ${props => props.active ? '#333' : '#999'};
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${props => props.active ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    color: #333;
  }
`;

export const MemoriesSection = styled.section`
  margin-bottom: 24px;
`;

export const MemoriesHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const MemoriesTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    width: 20px;
    height: 20px;
    color: #7b5fff;
  }
`;

export const MemoriesDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

export const MemoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

export const MemoryCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

export const MemoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #9b7fff 0%, #7b5fff 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 20px;
  flex-shrink: 0;
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const ProfileName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const LockIcon = styled.span`
  display: inline-flex;
  align-items: center;
  
  svg {
    width: 14px;
    height: 14px;
    color: #999;
  }
`;

export const MemoryDate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const MemoryActivity = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const MemoryDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.5;
`;

export const MemoryTag = styled.span<{ type: 'public' | 'private' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.type === 'public' 
    ? '#e8f5e9' 
    : '#fff3e0'};
  color: ${props => props.type === 'public' 
    ? '#2e7d32' 
    : '#f57c00'};
  margin-bottom: 12px;
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

export const MemoryFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
`;

export const InteractionButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: ${props => props.active ? '#e91e63' : '#999'};
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.2s;
  
  &:hover {
    background: #f5f5f5;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
`;

/* 모달 스타일 */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  transition: color 0.2s;
  
  &:hover {
    color: #333;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ModalDescription = styled.p`
  font-size: 14px;
  color: #666;
  padding: 12px 24px 24px;
  margin: 0;
  line-height: 1.5;
`;

export const RecommendedMemoriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 24px 24px;
`;

export const RecommendedMemoryCard = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const RecommendedMemoryIcon = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  background: ${props => props.color};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 28px;
    height: 28px;
    color: white;
  }
`;

export const RecommendedMemoryContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RecommendedMemoryTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const RecommendedMemoryDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

export const PreferenceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

export const PreferenceLabel = styled.span`
  font-size: 12px;
  color: #666;
`;

export const PreferencesList = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const PreferenceTag = styled.span`
  background: #fff3e0;
  color: #f57c00;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

export const MembersList = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

export const MemberItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const MemberAvatar = styled.span`
  font-size: 16px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MemberName = styled.span`
  font-size: 12px;
  color: #666;
`;

export const RecommendedMemoryTag = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  
  span {
    color: #999;
  }
`;

export const RecommendedMemoryFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 12px;
  min-width: 100px;
`;

export const RecommendedPointsTag = styled.span`
  background: linear-gradient(135deg, #ffd54f 0%, #ffc107 100%);
  color: #333;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

export const SelectButton = styled.button`
  background: none;
  border: none;
  color: #7b5fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  
  &:hover {
    color: #9b7fff;
  }
`;

/* 추억 추가 모달 스타일 */
export const AddMemoryModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const AddMemoryForm = styled.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const FormInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
  background: white;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #7b5fff;
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const FormTextarea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
  background: white;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #7b5fff;
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const FormSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #7b5fff;
  }
`;

export const UploadArea = styled.div<{ hasImage: boolean }>`
  border: 2px dashed ${props => props.hasImage ? '#7b5fff' : '#e0e0e0'};
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.hasImage ? '#f9f9f9' : 'white'};
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  
  &:hover {
    border-color: #7b5fff;
    background: #f9f9f9;
  }
`;

export const UploadIcon = styled.div`
  width: 48px;
  height: 48px;
  color: #999;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const UploadText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

export const UploadedImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
`;

export const PublicToggleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 12px;
`;

export const PublicToggleLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

export const GlobeIcon = styled.div`
  width: 24px;
  height: 24px;
  color: #7b5fff;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const PublicToggleTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

export const PublicToggleDescription = styled.div`
  font-size: 12px;
  color: #666;
`;

export const ToggleSwitch = styled.div<{ active: boolean }>`
  width: 50px;
  height: 28px;
  background: ${props => props.active ? '#7b5fff' : '#ccc'};
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
`;

export const ToggleSlider = styled.div<{ active: boolean }>`
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${props => props.active ? '24px' : '2px'};
  transition: left 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #ff8a65 0%, #ff7043 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 8px;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 138, 101, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

/* 추억 상세 모달 스타일 */
export const MemoryDetailModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const MemoryDetailContent = styled.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MemoryDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

export const MemoryDetailProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

export const MemoryDetailProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MemoryDetailName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const MemoryDetailDate = styled.div`
  font-size: 12px;
  color: #999;
`;

export const MemoryDetailActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #e0e0e0;
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #fff5f5;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  color: #e91e63;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #ffe0e0;
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const MemoryDetailTag = styled.span<{ type: 'public' | 'private' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.type === 'public' 
    ? '#e8f5e9' 
    : '#fff3e0'};
  color: ${props => props.type === 'public' 
    ? '#2e7d32' 
    : '#f57c00'};
  width: fit-content;
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const MemoryDetailActivity = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const MemoryDetailDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

export const MemoryDetailLikes = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
`;

export const LikeIcon = styled.div<{ active: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? '#e91e63' : '#999'};
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const LikeCount = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommentsTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const CommentProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CommentAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #9b7fff 0%, #7b5fff 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  flex-shrink: 0;
`;

export const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const CommentAuthor = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const CommentTime = styled.div`
  font-size: 12px;
  color: #999;
`;

export const CommentContent = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-left: 40px;
`;

export const CommentActions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 40px;
`;

export const CommentActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #999;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  
  &:hover {
    color: #333;
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const CommentInputSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 14px;
  color: #333;
  background: #f9f9f9;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #7b5fff;
    background: white;
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const CommentSendButton = styled.button`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #9b7fff 0%, #7b5fff 100%);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, opacity 0.2s;
  flex-shrink: 0;
  
  &:hover:not(:disabled) {
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

/* 삭제 요청 알림 배너 */
export const DeleteRequestNotification = styled.div`
  background: linear-gradient(135deg, #ffebee 0%, #fce4ec 100%);
  border-left: 4px solid #e91e63;
  border-radius: 12px;
  padding: 16px 20px;
  margin: 16px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(233, 30, 99, 0.1);
`;

export const NotificationIcon = styled.div`
  width: 24px;
  height: 24px;
  color: #e91e63;
  flex-shrink: 0;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const NotificationContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NotificationTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #c2185b;
`;

export const NotificationMessage = styled.div`
  font-size: 12px;
  color: #880e4f;
`;

export const NotificationActions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

export const NotificationButton = styled.button<{ variant: 'ignore' | 'confirm' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.variant === 'ignore' ? `
    background: white;
    color: #666;
    &:hover {
      background: #f5f5f5;
    }
  ` : `
    background: #e91e63;
    color: white;
    &:hover {
      background: #c2185b;
    }
  `}
`;

/* 삭제 요청 확인 모달 */
export const DeleteRequestModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  border: 2px solid #ffebee;
`;

export const DeleteRequestTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  text-align: center;
`;

export const DeleteRequestMessage = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 24px 0;
  text-align: center;
`;

export const DeleteRequestActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const DeleteRequestButton = styled.button<{ variant: 'cancel' | 'confirm' }>`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.variant === 'cancel' ? `
    background: white;
    color: #666;
    border: 1px solid #e0e0e0;
    &:hover {
      background: #f5f5f5;
    }
  ` : `
    background: #e91e63;
    color: white;
    &:hover {
      background: #c2185b;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(233, 30, 99, 0.3);
    }
  `}
`;

/* 삭제 요청 목록 모달 */
export const DeleteRequestListModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const DeleteRequestListDescription = styled.p`
  padding: 0 24px 20px;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

export const DeleteRequestList = styled.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DeleteRequestCard = styled.div`
  background: linear-gradient(135deg, #ffebee 0%, #fce4ec 100%);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: visible;
`;

export const DeleteRequestCardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

export const DeleteRequestRequesterAvatars = styled.div`
  display: flex;
  align-items: center;
`;

export const DeleteRequestRequesterAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #9b7fff 0%, #7b5fff 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: 2px solid white;
  z-index: 1;
  
  &:first-child {
    z-index: 2;
  }
`;

export const DeleteRequestCardMiddle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DeleteRequestWarning = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  
  svg {
    width: 18px;
    height: 18px;
    color: #e91e63;
  }
`;

export const DeleteRequestInfo = styled.div`
  font-size: 12px;
  color: #666;
`;

export const DeleteRequestCardRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  position: relative;
  z-index: 0;
`;

export const DeleteRequestCategoryIcon = styled.div`
  width: 32px;
  height: 32px;
  color: #7b5fff;
  position: relative;
  z-index: 0;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const DeleteRequestCategoryLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

export const DeleteRequestCardActions = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  z-index: 30;
  background: transparent;
`;

export const DeleteRequestViewButton = styled.button`
  padding: 8px 16px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f5f5f5;
  }
`;

export const DeleteRequestDeleteButton = styled.button`
  padding: 8px 16px;
  background: #e91e63;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: #c2185b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(233, 30, 99, 0.3);
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

