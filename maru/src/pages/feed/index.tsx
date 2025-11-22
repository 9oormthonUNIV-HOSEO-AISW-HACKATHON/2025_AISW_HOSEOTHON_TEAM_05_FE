import React, { useState, useEffect, useMemo } from 'react';
import * as S from './index.styles.tsx';

interface Challenge {
  id: string;
  category: string;
  title: string;
  iconColor: string;
  points: number;
  icon: React.ReactNode;
}

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  time: string;
}

interface DeleteRequest {
  id: string;
  memoryId: string;
  requesterName: string;
  requesterAvatar?: string;
  requestTime: string;
  memory: Memory;
}

interface Memory {
  id: string;
  author: string;
  authorAvatar?: string; // 작성자 아바타
  date: string;
  activity: string;
  description: string;
  tag: {
    type: 'public' | 'private';
    label: string;
  };
  likes: number;
  comments: number;
  liked: boolean;
  isFamily: boolean; // 우리 가족 여부
  commentList?: Comment[]; // 댓글 목록
}

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  tastes?: string[];
}

interface CommonPreference {
  taste: string;
  members: Member[]; // 해당 취향을 선택한 구성원들
}

interface RecommendedMemory {
  id: string;
  title: string;
  description: string;
  tag?: string;
  preferences?: string[]; // 공통 취향이 있을 때
  commonPreference?: CommonPreference; // 공통 취향 정보
  points: number;
  iconColor: string;
  icon: React.ReactNode;
}

const FamilyMemoryFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'family' | 'popular'>('all');
  const [isRecommendModalOpen, setIsRecommendModalOpen] = useState(false);
  const [isAddMemoryModalOpen, setIsAddMemoryModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [newComment, setNewComment] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [isDeleteRequestModalOpen, setIsDeleteRequestModalOpen] = useState(false);
  const [deleteRequestCount, setDeleteRequestCount] = useState(0);
  const [showDeleteRequestNotification, setShowDeleteRequestNotification] = useState(false);
  const [isDeleteRequestListModalOpen, setIsDeleteRequestListModalOpen] = useState(false);
  const [deleteRequests, setDeleteRequests] = useState<DeleteRequest[]>([]);
  
  // 추억 추가 폼 상태
  const [newMemory, setNewMemory] = useState({
    title: '',
    description: '',
    date: '',
    category: '공예/DIY',
    isPublic: true,
    image: null as File | null,
    imagePreview: null as string | null,
  });
  
  // 가족 구성원 데이터 가져오기
  useEffect(() => {
    // localStorage에서 가족 구성원 데이터 가져오기
    const storedMembers = localStorage.getItem('familyMembers');
    if (storedMembers) {
      try {
        const parsed = JSON.parse(storedMembers);
        setMembers(parsed);
      } catch (e) {
        console.error('Failed to parse members from localStorage', e);
      }
    }
  }, []);

  // 공통 취향 계산
  const commonPreferences = useMemo(() => {
    if (members.length < 2) return [];
    
    // 모든 구성원의 취향 수집
    const allTastes: { [key: string]: Member[] } = {};
    
    members.forEach(member => {
      member.tastes?.forEach(taste => {
        if (!allTastes[taste]) {
          allTastes[taste] = [];
        }
        allTastes[taste].push(member);
      });
    });
    
    // 모든 구성원이 공통으로 선택한 취향 찾기
    const common: CommonPreference[] = [];
    Object.keys(allTastes).forEach(taste => {
      if (allTastes[taste].length === members.length) {
        common.push({
          taste,
          members: allTastes[taste]
        });
      }
    });
    
    return common;
  }, [members]);

  const hasCommonPreferences = commonPreferences.length > 0;
  const [memories, setMemories] = useState<Memory[]>([]);

  const challenges: Challenge[] = [
    {
      id: '1',
      category: '이번 주 가족 미션',
      title: '함께 영화 보고 추억 남기기',
      iconColor: 'linear-gradient(135deg, #9b7fff 0%, #7b5fff 100%)',
      points: 50,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4h-2l2 4h-3l-2-4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
        </svg>
      ),
    },
    {
      id: '2',
      category: '인기 챌린지',
      title: '주말 산책 인증샷 올리기',
      iconColor: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
      points: 30,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
        </svg>
      ),
    },
    {
      id: '3',
      category: '이달의 트렌드',
      title: '가족 요리 만들기',
      iconColor: 'linear-gradient(135deg, #ff8a65 0%, #ff7043 100%)',
      points: 40,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
        </svg>
      ),
    },
  ];

  const handleLike = (memoryId: string) => {
    setMemories(prev => prev.map(memory => {
      if (memory.id === memoryId) {
        const updated = { 
          ...memory, 
          liked: !memory.liked, 
          likes: memory.liked ? memory.likes - 1 : memory.likes + 1 
        };
        // 선택된 메모리도 업데이트
        if (selectedMemory && selectedMemory.id === memoryId) {
          setSelectedMemory(updated);
        }
        return updated;
      }
      return memory;
    }));
  };

  const handleBack = () => {
    console.log('뒤로 가기');
  };

  const handleRecommendMemories = () => {
    // localStorage에서 최신 데이터 다시 가져오기
    const storedMembers = localStorage.getItem('familyMembers');
    if (storedMembers) {
      try {
        const parsed = JSON.parse(storedMembers);
        setMembers(parsed);
      } catch (e) {
        console.error('Failed to parse members from localStorage', e);
      }
    }
    setIsRecommendModalOpen(true);
  };

  const handleCloseRecommendModal = () => {
    setIsRecommendModalOpen(false);
  };

  const handleSelectMemory = (memoryId: string) => {
    console.log('추억 선택:', memoryId);
    // 여기에 추억 선택 로직 추가
  };

  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
  };

  const handleCloseMemoryDetail = () => {
    setSelectedMemory(null);
    setNewComment('');
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedMemory) return;

    // 현재 사용자 정보 가져오기
    const storedMembers = localStorage.getItem('familyMembers');
    let currentUser = '';
    let currentUserAvatar = '👤';
    if (storedMembers) {
      try {
        const parsed = JSON.parse(storedMembers);
        if (parsed.length > 0) {
          currentUser = parsed[0].name;
          currentUserAvatar = parsed[0].avatar || '👤';
        }
      } catch (e) {
        console.error('Failed to parse members', e);
      }
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: currentUser,
      authorAvatar: currentUserAvatar,
      content: newComment,
      time: '방금 전',
    };

    // 메모리에 댓글 추가
    setMemories(prev => prev.map(m => 
      m.id === selectedMemory.id 
        ? { 
            ...m, 
            comments: m.comments + 1,
            commentList: [...(m.commentList || []), comment]
          }
        : m
    ));

    // 선택된 메모리도 업데이트
    setSelectedMemory(prev => prev ? {
      ...prev,
      comments: prev.comments + 1,
      commentList: [...(prev.commentList || []), comment]
    } : null);

    setNewComment('');
  };

  const handleDeleteComment = (commentId: string) => {
    if (!selectedMemory) return;

    setMemories(prev => prev.map(m => 
      m.id === selectedMemory.id 
        ? { 
            ...m, 
            comments: Math.max(0, m.comments - 1),
            commentList: (m.commentList || []).filter(c => c.id !== commentId)
          }
        : m
    ));

    setSelectedMemory(prev => prev ? {
      ...prev,
      comments: Math.max(0, prev.comments - 1),
      commentList: (prev.commentList || []).filter(c => c.id !== commentId)
    } : null);
  };

  const handleEditMemory = () => {
    // 추억 수정 로직 (추후 구현)
    console.log('추억 수정:', selectedMemory?.id);
  };

  const handleDeleteMemory = () => {
    if (!selectedMemory) return;
    setIsDeleteRequestModalOpen(true);
  };

  const handleCloseDeleteRequestModal = () => {
    setIsDeleteRequestModalOpen(false);
  };

  const handleConfirmDeleteRequest = () => {
    if (!selectedMemory) return;
    
    // 현재 사용자 정보 가져오기
    const storedMembers = localStorage.getItem('familyMembers');
    let currentUser = '';
    let currentUserAvatar = '👤';
    if (storedMembers) {
      try {
        const parsed = JSON.parse(storedMembers);
        if (parsed.length > 0) {
          currentUser = parsed[0].name;
          currentUserAvatar = parsed[0].avatar || '👤';
        }
      } catch (e) {
        console.error('Failed to parse members', e);
      }
    }
    
    // 삭제 요청 생성
    const deleteRequest: DeleteRequest = {
      id: Date.now().toString(),
      memoryId: selectedMemory.id,
      requesterName: currentUser,
      requesterAvatar: currentUserAvatar,
      requestTime: '방금 전',
      memory: selectedMemory,
    };
    
    // 삭제 요청 목록에 추가
    setDeleteRequests(prev => [...prev, deleteRequest]);
    
    // 삭제 요청 카운트 증가
    setDeleteRequestCount(prev => prev + 1);
    // 삭제 요청 알림 표시
    setShowDeleteRequestNotification(true);
    // 모달 닫기
    setIsDeleteRequestModalOpen(false);
    handleCloseMemoryDetail();
  };

  const handleIgnoreDeleteRequest = () => {
    setShowDeleteRequestNotification(false);
    setDeleteRequestCount(prev => Math.max(0, prev - 1));
  };

  const handleConfirmDeleteRequestNotification = () => {
    // 삭제 요청 목록 모달 열기
    setIsDeleteRequestListModalOpen(true);
    setShowDeleteRequestNotification(false);
  };

  const handleCloseDeleteRequestListModal = () => {
    setIsDeleteRequestListModalOpen(false);
  };

  const handleViewDeleteRequestDetail = (deleteRequest: DeleteRequest) => {
    // 해당 추억 상세 모달 열기
    setSelectedMemory(deleteRequest.memory);
    setIsDeleteRequestListModalOpen(false);
  };

  const handleDeleteFromRequestList = (deleteRequest: DeleteRequest) => {
    // 해당 추억 삭제
    setMemories(prev => prev.filter(m => m.id !== deleteRequest.memoryId));
    // 삭제 요청 목록에서 제거
    setDeleteRequests(prev => prev.filter(r => r.id !== deleteRequest.id));
    // 삭제 요청 카운트 감소
    setDeleteRequestCount(prev => Math.max(0, prev - 1));
    
    // 삭제 요청이 없으면 모달 닫기
    if (deleteRequests.length === 1) {
      setIsDeleteRequestListModalOpen(false);
    }
  };

  // 취향별 추천 추억 매핑
  const getRecommendedMemoriesByTaste = (taste: string, commonPref: CommonPreference): RecommendedMemory => {
    const tasteMap: { [key: string]: Omit<RecommendedMemory, 'id' | 'commonPreference'> } = {
      '가드닝': {
        title: '식물 키우기',
        description: '새로운 식물 함께 심기',
        tag: '공예/DIY',
        points: 40,
        iconColor: 'linear-gradient(135deg, #66bb6a 0%, #4caf50 100%)',
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 12c0-1.38-.56-2.63-1.46-3.54L12 3.5 7.96 8.46c-.9.91-1.46 2.16-1.46 3.54 0 2.76 2.24 5 5 5s5-2.24 5-5zm-5-8.5l3.54 3.54c.39.39.39 1.02 0 1.41L12 12.5 7.96 8.46c-.39-.39-.39-1.02 0-1.41L11.5 3.5zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5 0-.79.26-1.52.7-2.11L12 4.5l2.8 5.39c.44.59.7 1.32.7 2.11 0 1.93-1.57 3.5-3.5 3.5z" />
          </svg>
        ),
      },
      '공예/DIY': {
        title: '가드닝 데이',
        description: '정원 꾸미고 관리하기',
        tag: '공예/DIY',
        points: 45,
        iconColor: 'linear-gradient(135deg, #66bb6a 0%, #4caf50 100%)',
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 12c0-1.38-.56-2.63-1.46-3.54L12 3.5 7.96 8.46c-.9.91-1.46 2.16-1.46 3.54 0 2.76 2.24 5 5 5s5-2.24 5-5zm-5-8.5l3.54 3.54c.39.39.39 1.02 0 1.41L12 12.5 7.96 8.46c-.39-.39-.39-1.02 0-1.41L11.5 3.5zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5 0-.79.26-1.52.7-2.11L12 4.5l2.8 5.39c.44.59.7 1.32.7 2.11 0 1.93-1.57 3.5-3.5 3.5z" />
          </svg>
        ),
      },
      '영화 감상': {
        title: '가족 영화 감상',
        description: '함께 영화 보고 감상평 나누기',
        points: 50,
        iconColor: 'linear-gradient(135deg, #9b7fff 0%, #7b5fff 100%)',
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4h-2l2 4h-3l-2-4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
          </svg>
        ),
      },
      '산책하기': {
        title: '주말 산책',
        description: '공원이나 산책로 함께 걷기',
        points: 40,
        iconColor: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
          </svg>
        ),
      },
      '요리하기': {
        title: '가족 쿠킹 클래스',
        description: '새로운 요리 함께 만들기',
        tag: '요리하기',
        points: 50,
        iconColor: 'linear-gradient(135deg, #ff8a65 0%, #ff7043 100%)',
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
          </svg>
        ),
      },
    };

    const defaultMemory = {
      title: '가족 활동',
      description: '함께 즐거운 시간 보내기',
      points: 40,
      iconColor: 'linear-gradient(135deg, #9b7fff 0%, #7b5fff 100%)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
    };

    return {
      id: `memory-${taste}`,
      ...(tasteMap[taste] || defaultMemory),
      commonPreference: commonPref,
    };
  };

  // 공통 취향이 있을 때 추천 추억 생성 (공통 취향 하나당 추억 하나)
  const recommendedMemoriesWithPreferences: RecommendedMemory[] = useMemo(() => {
    return commonPreferences.map((commonPref) => {
      return getRecommendedMemoriesByTaste(commonPref.taste, commonPref);
    });
  }, [commonPreferences]);

  // 공통 취향이 없을 때 추천 추억
  const recommendedMemoriesWithoutPreferences: RecommendedMemory[] = [
    {
      id: '1',
      title: '가족 영화 감상',
      description: '함께 영화 보고 감상평 나누기',
      points: 50,
      iconColor: 'linear-gradient(135deg, #9b7fff 0%, #7b5fff 100%)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4h-2l2 4h-3l-2-4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
        </svg>
      ),
    },
    {
      id: '2',
      title: '주말 산책',
      description: '공원이나 산책로 함께 걷기',
      points: 40,
      iconColor: 'linear-gradient(135deg, #66bb6a 0%, #4caf50 100%)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
        </svg>
      ),
    },
    {
      id: '3',
      title: '가족 쿠킹 클래스',
      description: '새로운 요리 함께 만들기',
      points: 50,
      iconColor: 'linear-gradient(135deg, #ff8a65 0%, #ff7043 100%)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
        </svg>
      ),
    },
  ];

  const handleAddMemory = () => {
    setIsAddMemoryModalOpen(true);
  };

  const handleCloseAddMemoryModal = () => {
    setIsAddMemoryModalOpen(false);
    // 폼 초기화
    setNewMemory({
      title: '',
      description: '',
      date: '',
      category: '공예/DIY',
      isPublic: true,
      image: null,
      imagePreview: null,
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setNewMemory(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewMemory(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setNewMemory(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSaveMemory = () => {
    if (!newMemory.title || !newMemory.description || !newMemory.date) {
      alert('제목, 내용, 날짜를 모두 입력해주세요.');
      return;
    }

    // 현재 사용자 정보 가져오기 (localStorage에서)
    const storedMembers = localStorage.getItem('familyMembers');
    let currentUser = '';
    let currentUserAvatar = '👤';
    if (storedMembers) {
      try {
        const parsed = JSON.parse(storedMembers);
        if (parsed.length > 0) {
          currentUser = parsed[0].name;
          currentUserAvatar = parsed[0].avatar || '👤';
        }
      } catch (e) {
        console.error('Failed to parse members', e);
      }
    }
    
    if (!currentUser) {
      alert('가족 구성원 정보를 찾을 수 없습니다.');
      return;
    }

    // 날짜 포맷팅
    const dateObj = new Date(newMemory.date);
    const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

    // 새 추억 생성
    const newMemoryItem: Memory = {
      id: Date.now().toString(),
      author: currentUser,
      authorAvatar: currentUserAvatar,
      date: formattedDate,
      activity: newMemory.title,
      description: newMemory.description,
      tag: {
        type: newMemory.isPublic ? 'public' : 'private',
        label: newMemory.category,
      },
      likes: 0,
      comments: 0,
      liked: false,
      isFamily: !newMemory.isPublic, // 공개가 아니면 우리 가족 탭에
      commentList: [], // 초기 댓글 목록
    };

    // 메모리 추가
    setMemories(prev => [newMemoryItem, ...prev]);
    
    // 모달 닫기 및 폼 초기화
    handleCloseAddMemoryModal();
    
    // 공개 추억이면 전체 피드 탭으로, 아니면 우리 가족 탭으로 이동
    if (newMemory.isPublic) {
      setActiveTab('all');
    } else {
      setActiveTab('family');
    }
  };

  // 카테고리 옵션
  const categoryOptions = [
    '영화 감상',
    '음악 듣기',
    '요리하기',
    '산책하기',
    '독서',
    '게임',
    '여행',
    '운동',
    '공예/DIY',
    '가드닝',
    '카페 가기',
    'TV/드라마',
  ];

  const handleParticipate = (challengeId: string) => {
    console.log('챌린지 참여:', challengeId);
  };

  // 탭별 메모리 필터링
  const filteredMemories = memories.filter((memory) => {
    if (activeTab === 'family') {
      return memory.isFamily;
    } else if (activeTab === 'popular') {
      return memory.likes > 0;
    } else {
      // 전체 피드: 공개 추억 (tag.type === 'public')
      return memory.tag.type === 'public';
    }
  });

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={handleBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>뒤로</span>
        </S.BackButton>
        <S.HeaderActions>
          <S.ActionButton variant="purple" onClick={handleRecommendMemories}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            추천 추억
          </S.ActionButton>
          <S.ActionButton variant="orange" onClick={handleAddMemory}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            추억 추가
          </S.ActionButton>
        </S.HeaderActions>
      </S.Header>

      {/* 삭제 요청 알림 배너 */}
      {showDeleteRequestNotification && deleteRequestCount > 0 && (
        <S.DeleteRequestNotification>
          <S.NotificationIcon>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </S.NotificationIcon>
          <S.NotificationContent>
            <S.NotificationTitle>삭제 요청 알림</S.NotificationTitle>
            <S.NotificationMessage>{deleteRequestCount}개의 추억에 삭제 요청이 있습니다.</S.NotificationMessage>
          </S.NotificationContent>
          <S.NotificationActions>
            <S.NotificationButton variant="ignore" onClick={handleIgnoreDeleteRequest}>
              무시하기
            </S.NotificationButton>
            <S.NotificationButton variant="confirm" onClick={handleConfirmDeleteRequestNotification}>
              확인하기
            </S.NotificationButton>
          </S.NotificationActions>
        </S.DeleteRequestNotification>
      )}

      <S.MainContent>
        <S.FeedHeader>
          <S.CameraIcon>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </S.CameraIcon>
          <S.FeedTitle>가족 추억 피드</S.FeedTitle>
          <S.FeedDescription>
            함께한 소중한 순간을 공유하고 공감받아보세요
          </S.FeedDescription>
        </S.FeedHeader>

        <S.ChallengesSection>
          <S.SectionTitle>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
            이번 주 챌린지
          </S.SectionTitle>
          <S.ChallengesGrid>
            {challenges.map((challenge) => (
              <S.ChallengeCard key={challenge.id}>
                <S.ChallengeIcon color={challenge.iconColor}>
                  {challenge.icon}
                </S.ChallengeIcon>
                <S.ChallengeCategory>{challenge.category}</S.ChallengeCategory>
                <S.ChallengeTitle>{challenge.title}</S.ChallengeTitle>
                <S.ChallengeFooter>
                  <S.PointsTag>{challenge.points} 포인트</S.PointsTag>
                  <S.ParticipateButton onClick={() => handleParticipate(challenge.id)}>
                    참여하기 →
                  </S.ParticipateButton>
                </S.ChallengeFooter>
              </S.ChallengeCard>
            ))}
          </S.ChallengesGrid>
        </S.ChallengesSection>

        <S.InfoBox>
          <S.InfoIcon>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
            </svg>
          </S.InfoIcon>
          <S.InfoContent>
            <S.InfoTitle>추억이 인기를 얻으면?</S.InfoTitle>
            <S.InfoText>
              좋아요를 많이 받은 추억은 '인기 추억'섹션에 표시됩니다! 가족들과 함께 챌린지에 참여하고 멋진 추억을 만들어보세요.
            </S.InfoText>
          </S.InfoContent>
        </S.InfoBox>

        <S.NavigationTabs>
          <S.Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            전체 피드
          </S.Tab>
          <S.Tab active={activeTab === 'family'} onClick={() => setActiveTab('family')}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            우리 가족
          </S.Tab>
          <S.Tab active={activeTab === 'popular'} onClick={() => setActiveTab('popular')}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
            </svg>
            인기
          </S.Tab>
        </S.NavigationTabs>

        <S.MemoriesSection>
          <S.MemoriesHeader>
            <S.MemoriesTitle>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              가족 추억들
            </S.MemoriesTitle>
          </S.MemoriesHeader>
          <S.MemoriesDescription>
            가족과 함께한 추억들을 확인해보세요
          </S.MemoriesDescription>
          <S.MemoriesGrid>
            {filteredMemories.length === 0 ? (
              <S.EmptyState>
                {activeTab === 'all' 
                  ? '다른 가족들의 추억이 아직 없습니다.' 
                  : activeTab === 'family'
                  ? '우리 가족의 추억이 없습니다.'
                  : '인기 추억이 없습니다.'}
              </S.EmptyState>
            ) : (
              filteredMemories.map((memory) => {
                // 아바타 찾기: 메모리에 저장된 아바타가 있으면 사용, 없으면 members에서 찾기
                const member = members.find(m => m.name === memory.author);
                const avatar = memory.authorAvatar || member?.avatar || memory.author.charAt(0);
                
                return (
                  <S.MemoryCard key={memory.id} onClick={() => handleMemoryClick(memory)}>
                    <S.MemoryHeader>
                      <S.ProfileImage>
                        {avatar}
                      </S.ProfileImage>
                      <S.ProfileInfo>
                        <S.ProfileName>
                          {memory.author}
                          {memory.tag.type === 'private' && (
                            <S.LockIcon>
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                              </svg>
                            </S.LockIcon>
                          )}
                        </S.ProfileName>
                        <S.MemoryDate>
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                          </svg>
                          {memory.date}
                        </S.MemoryDate>
                      </S.ProfileInfo>
                    </S.MemoryHeader>
                    <S.MemoryActivity>{memory.activity}</S.MemoryActivity>
                    <S.MemoryDescription>{memory.description}</S.MemoryDescription>
                    <S.MemoryTag type={memory.tag.type}>
                      {memory.tag.type === 'public' ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                        </svg>
                      )}
                      {memory.tag.label}
                    </S.MemoryTag>
                    <S.MemoryFooter>
                      <S.InteractionButton 
                        active={memory.liked} 
                        onClick={() => handleLike(memory.id)}
                      >
                        <svg viewBox="0 0 24 24" fill={memory.liked ? 'currentColor' : 'none'} stroke="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {memory.likes}
                      </S.InteractionButton>
                      <S.InteractionButton>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        {memory.comments}
                      </S.InteractionButton>
                    </S.MemoryFooter>
                  </S.MemoryCard>
                );
              })
            )}
          </S.MemoriesGrid>
        </S.MemoriesSection>
      </S.MainContent>

      {/* 추천 추억 모달 */}
      {isRecommendModalOpen && (
        <S.ModalOverlay onClick={handleCloseRecommendModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>가족 취향 기반 추천 추억</S.ModalTitle>
              <S.ModalCloseButton onClick={handleCloseRecommendModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </S.ModalCloseButton>
            </S.ModalHeader>
            <S.ModalDescription>
              가족 구성원들의 공통 취향을 바탕으로 특별한 추억을 만들어보세요
            </S.ModalDescription>
            <S.RecommendedMemoriesList>
              {(hasCommonPreferences ? recommendedMemoriesWithPreferences : recommendedMemoriesWithoutPreferences).map((memory) => (
                <S.RecommendedMemoryCard key={memory.id}>
                  <S.RecommendedMemoryIcon color={memory.iconColor}>
                    {memory.icon}
                  </S.RecommendedMemoryIcon>
                  <S.RecommendedMemoryContent>
                    <S.RecommendedMemoryTitle>{memory.title}</S.RecommendedMemoryTitle>
                    <S.RecommendedMemoryDescription>{memory.description}</S.RecommendedMemoryDescription>
                    {hasCommonPreferences && memory.commonPreference && (
                      <>
                        <S.PreferenceSection>
                          <S.PreferenceLabel>취향 해당:</S.PreferenceLabel>
                          <S.PreferencesList>
                            <S.PreferenceTag>{memory.commonPreference.taste}</S.PreferenceTag>
                          </S.PreferencesList>
                        </S.PreferenceSection>
                        <S.MembersList>
                          {memory.commonPreference.members.map((member) => (
                            <S.MemberItem key={member.id}>
                              <S.MemberAvatar>{member.avatar}</S.MemberAvatar>
                              <S.MemberName>{member.name}</S.MemberName>
                            </S.MemberItem>
                          ))}
                        </S.MembersList>
                      </>
                    )}
                    {!hasCommonPreferences && memory.tag && (
                      <S.RecommendedMemoryTag>
                        {memory.tag}
                        {memory.preferences && (
                          <span> 취향 해당: {memory.preferences.join(', ')}</span>
                        )}
                      </S.RecommendedMemoryTag>
                    )}
                  </S.RecommendedMemoryContent>
                  <S.RecommendedMemoryFooter>
                    <S.RecommendedPointsTag>{memory.points} 포인트</S.RecommendedPointsTag>
                    <S.SelectButton onClick={() => handleSelectMemory(memory.id)}>
                      선택하기 →
                    </S.SelectButton>
                  </S.RecommendedMemoryFooter>
                </S.RecommendedMemoryCard>
              ))}
            </S.RecommendedMemoriesList>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {/* 추억 추가 모달 */}
      {isAddMemoryModalOpen && (
        <S.ModalOverlay onClick={handleCloseAddMemoryModal}>
          <S.AddMemoryModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>새 추억 기록하기</S.ModalTitle>
              <S.ModalCloseButton onClick={handleCloseAddMemoryModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </S.ModalCloseButton>
            </S.ModalHeader>

            <S.AddMemoryForm>
              <S.FormField>
                <S.FormLabel>제목</S.FormLabel>
                <S.FormInput
                  type="text"
                  placeholder="새로운 식물 함께 심기"
                  value={newMemory.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </S.FormField>

              <S.FormField>
                <S.FormLabel>내용</S.FormLabel>
                <S.FormTextarea
                  placeholder="함께한 순간을 자세히 기록해보세요"
                  value={newMemory.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              </S.FormField>

              <S.FormField>
                <S.FormLabel>날짜</S.FormLabel>
                <S.FormInput
                  type="date"
                  value={newMemory.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </S.FormField>

              <S.FormField>
                <S.FormLabel>카테고리</S.FormLabel>
                <S.FormSelect
                  value={newMemory.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </S.FormSelect>
              </S.FormField>

              <S.FormField>
                <S.FormLabel>사진 업로드 (선택)</S.FormLabel>
                <S.UploadArea
                  onDrop={handleImageDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById('image-upload')?.click()}
                  hasImage={!!newMemory.imagePreview}
                >
                  {newMemory.imagePreview ? (
                    <S.UploadedImage src={newMemory.imagePreview} alt="Uploaded" />
                  ) : (
                    <>
                      <S.UploadIcon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </S.UploadIcon>
                      <S.UploadText>파일 선택 또는 드래그 앤 드롭</S.UploadText>
                    </>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />
                </S.UploadArea>
              </S.FormField>

              <S.PublicToggleSection>
                <S.PublicToggleLabel>
                  <S.GlobeIcon>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </S.GlobeIcon>
                  <div>
                    <S.PublicToggleTitle>공개 추억</S.PublicToggleTitle>
                    <S.PublicToggleDescription>전체 피드에 표시됩니다</S.PublicToggleDescription>
                  </div>
                </S.PublicToggleLabel>
                <S.ToggleSwitch
                  active={newMemory.isPublic}
                  onClick={() => handleInputChange('isPublic', !newMemory.isPublic)}
                >
                  <S.ToggleSlider active={newMemory.isPublic} />
                </S.ToggleSwitch>
              </S.PublicToggleSection>

              <S.SaveButton onClick={handleSaveMemory}>
                추억 저장
              </S.SaveButton>
            </S.AddMemoryForm>
          </S.AddMemoryModalContent>
        </S.ModalOverlay>
      )}

      {/* 추억 상세 모달 */}
      {selectedMemory && (
        <S.ModalOverlay onClick={handleCloseMemoryDetail}>
          <S.MemoryDetailModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>추억 상세</S.ModalTitle>
              <S.ModalCloseButton onClick={handleCloseMemoryDetail}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </S.ModalCloseButton>
            </S.ModalHeader>

            <S.MemoryDetailContent>
              <S.MemoryDetailHeader>
                <S.MemoryDetailProfile>
                  <S.ProfileImage>
                    {selectedMemory.authorAvatar || (() => {
                      const member = members.find(m => m.name === selectedMemory.author);
                      return member?.avatar || selectedMemory.author.charAt(0);
                    })()}
                  </S.ProfileImage>
                  <S.MemoryDetailProfileInfo>
                    <S.MemoryDetailName>{selectedMemory.author}</S.MemoryDetailName>
                    <S.MemoryDetailDate>{selectedMemory.date}</S.MemoryDetailDate>
                  </S.MemoryDetailProfileInfo>
                </S.MemoryDetailProfile>
                <S.MemoryDetailActions>
                  <S.EditButton onClick={handleEditMemory}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    수정
                  </S.EditButton>
                  <S.DeleteButton onClick={handleDeleteMemory}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                    삭제 요청
                  </S.DeleteButton>
                </S.MemoryDetailActions>
              </S.MemoryDetailHeader>

              <S.MemoryDetailTag type={selectedMemory.tag.type}>
                {selectedMemory.tag.type === 'public' ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                )}
                {selectedMemory.tag.label}
              </S.MemoryDetailTag>

              <S.MemoryDetailActivity>{selectedMemory.activity}</S.MemoryDetailActivity>
              <S.MemoryDetailDescription>{selectedMemory.description}</S.MemoryDetailDescription>

              <S.MemoryDetailLikes>
                <S.LikeIcon active={selectedMemory.liked} onClick={() => handleLike(selectedMemory.id)}>
                  <svg viewBox="0 0 24 24" fill={selectedMemory.liked ? 'currentColor' : 'none'} stroke="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </S.LikeIcon>
                <S.LikeCount>{selectedMemory.likes}</S.LikeCount>
              </S.MemoryDetailLikes>

              <S.CommentsSection>
                <S.CommentsTitle>댓글 {selectedMemory.comments}개</S.CommentsTitle>
                <S.CommentsList>
                  {(selectedMemory.commentList || []).map((comment) => {
                    const commentMember = members.find(m => m.name === comment.author);
                    const commentAvatar = comment.authorAvatar || commentMember?.avatar || comment.author.charAt(0);
                    return (
                      <S.CommentItem key={comment.id}>
                        <S.CommentProfile>
                          <S.CommentAvatar>{commentAvatar}</S.CommentAvatar>
                          <S.CommentInfo>
                            <S.CommentAuthor>{comment.author}</S.CommentAuthor>
                            <S.CommentTime>{comment.time}</S.CommentTime>
                          </S.CommentInfo>
                        </S.CommentProfile>
                        <S.CommentContent>{comment.content}</S.CommentContent>
                        <S.CommentActions>
                          <S.CommentActionButton>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </S.CommentActionButton>
                          <S.CommentActionButton onClick={() => handleDeleteComment(comment.id)}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                          </S.CommentActionButton>
                        </S.CommentActions>
                      </S.CommentItem>
                    );
                  })}
                </S.CommentsList>
              </S.CommentsSection>

              <S.CommentInputSection>
                <S.CommentInput
                  placeholder="댓글을 입력하세요..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                />
                <S.CommentSendButton onClick={handleAddComment} disabled={!newComment.trim()}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </S.CommentSendButton>
              </S.CommentInputSection>
            </S.MemoryDetailContent>
          </S.MemoryDetailModalContent>
        </S.ModalOverlay>
      )}

      {/* 삭제 요청 확인 모달 */}
      {isDeleteRequestModalOpen && selectedMemory && (
        <S.ModalOverlay onClick={handleCloseDeleteRequestModal}>
          <S.DeleteRequestModalContent onClick={(e) => e.stopPropagation()}>
            <S.DeleteRequestTitle>삭제를 요청하시겠습니까?</S.DeleteRequestTitle>
            <S.DeleteRequestMessage>
              작성자 {selectedMemory.author}님에게 삭제 요청이 전송됩니다. "{selectedMemory.activity}" 추억에 대한 삭제 요청을 보내시겠습니까?
            </S.DeleteRequestMessage>
            <S.DeleteRequestActions>
              <S.DeleteRequestButton variant="cancel" onClick={handleCloseDeleteRequestModal}>
                취소
              </S.DeleteRequestButton>
              <S.DeleteRequestButton variant="confirm" onClick={handleConfirmDeleteRequest}>
                요청 보내기
              </S.DeleteRequestButton>
            </S.DeleteRequestActions>
          </S.DeleteRequestModalContent>
        </S.ModalOverlay>
      )}

      {/* 삭제 요청 목록 모달 */}
      {isDeleteRequestListModalOpen && (
        <S.ModalOverlay onClick={handleCloseDeleteRequestListModal}>
          <S.DeleteRequestListModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>삭제 요청 목록</S.ModalTitle>
              <S.ModalCloseButton onClick={handleCloseDeleteRequestListModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </S.ModalCloseButton>
            </S.ModalHeader>

            <S.DeleteRequestListDescription>
              가족 구성원들이 삭제를 요청한 추억 목록입니다. 상세 내용을 확인하고 삭제 여부를 결정하세요.
            </S.DeleteRequestListDescription>

            <S.DeleteRequestList>
              {deleteRequests.length === 0 ? (
                <S.EmptyState>삭제 요청이 없습니다.</S.EmptyState>
              ) : (
                deleteRequests.map((deleteRequest) => {
                  // 같은 추억에 대한 요청들을 그룹화
                  const sameMemoryRequests = deleteRequests.filter(r => r.memoryId === deleteRequest.memoryId);
                  const requestCount = sameMemoryRequests.length;
                  const latestRequest = sameMemoryRequests[0];
                  
                  // 이미 표시된 추억은 건너뛰기
                  if (deleteRequest.id !== latestRequest.id) return null;
                  
                  return (
                    <S.DeleteRequestCard key={deleteRequest.id}>
                      <S.DeleteRequestCardLeft>
                        <S.DeleteRequestRequesterAvatars>
                          {sameMemoryRequests.slice(0, 2).map((req, idx) => {
                            const requesterMember = members.find(m => m.name === req.requesterName);
                            const requesterAvatar = req.requesterAvatar || requesterMember?.avatar || req.requesterName.charAt(0);
                            return (
                              <S.DeleteRequestRequesterAvatar key={req.id} style={{ marginLeft: idx > 0 ? '-8px' : '0' }}>
                                {requesterAvatar}
                              </S.DeleteRequestRequesterAvatar>
                            );
                          })}
                        </S.DeleteRequestRequesterAvatars>
                        <S.DeleteRequestCardRight>
                          <S.DeleteRequestCategoryLabel>{deleteRequest.memory.tag.label}</S.DeleteRequestCategoryLabel>
                        </S.DeleteRequestCardRight>
                      </S.DeleteRequestCardLeft>

                      <S.DeleteRequestCardMiddle>
                        <S.DeleteRequestWarning>
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                          </svg>
                          {requestCount}명이 삭제를 요청했습니다:
                        </S.DeleteRequestWarning>
                        <S.DeleteRequestInfo>
                          {latestRequest.requesterName} {latestRequest.requestTime}
                        </S.DeleteRequestInfo>
                      </S.DeleteRequestCardMiddle>

                      <S.DeleteRequestCardActions>
                        <S.DeleteRequestViewButton onClick={() => handleViewDeleteRequestDetail(deleteRequest)}>
                          상세 보기
                        </S.DeleteRequestViewButton>
                        <S.DeleteRequestDeleteButton onClick={() => handleDeleteFromRequestList(deleteRequest)}>
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                          삭제하기
                        </S.DeleteRequestDeleteButton>
                      </S.DeleteRequestCardActions>
                    </S.DeleteRequestCard>
                  );
                })
              )}
            </S.DeleteRequestList>
          </S.DeleteRequestListModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default FamilyMemoryFeed;

