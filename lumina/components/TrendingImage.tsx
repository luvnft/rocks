import React from 'react';
import { useNostr, useNostrEvents, useProfile } from "nostr-react";
import {
  nip19,
} from "nostr-tools";
import {
  Card,
  SmallCardContent,
} from "@/components/ui/card"
import Image from 'next/image';

interface TrendingImageProps {
  eventId: string;
  pubkey: string;
}

const TrendingImage: React.FC<TrendingImageProps> = ({ eventId, pubkey }) => {
  const { data: userData } = useProfile({
    pubkey,
  });

  const { events } = useNostrEvents({
    filter: {
      kinds: [1],
      ids: [eventId]
    },
  });

  const text = events && events.length > 0 ? events[0].content : '';
  const createdAt = events && events.length > 0 ? new Date(events[0].created_at * 1000) : new Date();
  const title = userData?.username || userData?.display_name || userData?.name || userData?.npub || nip19.npubEncode(pubkey);
  const imageSrc = text.match(/https?:\/\/.*\.(?:png|jpg|gif)/g)?.[0].split(' ');
  const textWithoutImage = text.replace(/https?:\/\/.*\.(?:png|jpg|gif)/g, '');
  const hrefProfile = `/profile/${nip19.npubEncode(pubkey)}`;
  const profileImageSrc = userData?.picture || "https://robohash.org/" + pubkey;

  return (
    <>
      <Card>
        <SmallCardContent>
          <div>
            <div className='d-flex justify-content-center align-items-center'>
              {imageSrc && imageSrc.length > 0 && (
                <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                  <a href={hrefProfile}>
                    <img src={imageSrc[0]} className='rounded lg:rounded-lg' style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={text} />
                  </a>
                </div>
                // <img src={imageSrc[0]} style={{ maxWidth: '100%', maxHeight: '100vh', objectFit: 'cover', margin: 'auto' }} alt={text} />
                // <div style={{ position: 'relative', width: '100%', maxHeight: '100vh' }}>
                //   <Image src={imageSrc[0]} alt={text} layout='fill' objectFit='contain' />
                // </div>
              )}
            </div>
          </div>
        </SmallCardContent>
      </Card>
    </>
  );
}

export default TrendingImage;