"use client";

import * as React from "react";

import { BadgeDot } from "../../atoms/badge-dot/badge-dot";
import { Button } from "../../atoms/button/button";
import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon, type FeatherIconName } from "../../atoms/icon/icon";
import { LoadingBar } from "../../atoms/loading-bar/loading-bar";
import { Slider } from "../../atoms/slider/slider";
import { SearchInput } from "../../molecules/search-input/search-input";
import {
  NavigationSide,
  NavigationSideBottom,
  NavigationSideClose,
  NavigationSideContent,
  NavigationSideDivider,
  NavigationSideHeader,
  NavigationSideItem,
  NavigationSideLogo,
  NavigationSideMobileHeader,
  NavigationSideSection,
  NavigationSideTop,
} from "../../organisms/navigation-side/navigation-side";
import {
  Table,
  TableBody,
  TableCell,
  TableCellActions,
  TableHead,
  TableHeader,
  TableRow,
} from "../../organisms/table/table";
import {
  TemplateUserMenu,
  type TemplateUser,
} from "../../templates/shared/template-user-menu";
import { MusicPlayerLayoutTemplate } from "../../templates/music-player/music-player-layout-template";
import headerBackgroundSrc from "../../templates/music-player/assets/header-background.jpg";
import janeSmithAvatarSrc from "../../templates/music-player/assets/jane-smith-avatar.png";
import nowPlayingCoverSrc from "../../templates/music-player/assets/now-playing-cover.png";
import playlistCoverSrc from "../../templates/music-player/assets/playlist-cover.png";
import practicalMusicSymbolSrc from "../../templates/music-player/assets/practical-music-symbol.svg";
import {
  summerChillTracks,
  type Track,
} from "../../templates/music-player/tracks-data";

export interface MusicPlayerPageProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  userMenuDefaultOpen?: boolean;
}

const janeSmith: TemplateUser = {
  name: "Jane Smith",
  email: "jane@practical-ui.com",
  src: janeSmithAvatarSrc,
};

const primaryNav: { label: string; icon: FeatherIconName }[] = [
  { label: "For you", icon: "heart" },
  { label: "Browse", icon: "music" },
  { label: "Library", icon: "book-open" },
];

const playlists = [
  "Old School",
  "Slow Jams",
  "80\u2019s Action Movies",
  "Summer Chill",
  "Trance",
];

function PracticalMusicLogo() {
  return (
    <span className="flex h-12 items-center gap-2">
      <img
        src={practicalMusicSymbolSrc}
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0"
      />
      <span className="pb-0.5 text-[28px] leading-7 tracking-[-0.28px] text-fg-strong">
        <span className="font-bold">Practical</span>
        <span className="font-light">Music</span>
      </span>
    </span>
  );
}

function TrackCover({ src, size }: { src: string; size: 48 | 64 }) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={
        size === 64
          ? "size-16 shrink-0 rounded border border-stroke-weak object-cover"
          : "size-12 shrink-0 rounded object-cover"
      }
    />
  );
}

function TrackTitle({ track }: { track: Track }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <TrackCover src={track.coverSrc} size={48} />
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-small text-fg-strong">
          {track.title}
        </span>
        <span className="truncate text-tiny text-fg-weak">{track.artist}</span>
      </span>
    </span>
  );
}

function PlaylistTable({ tracks }: { tracks: Track[] }) {
  return (
    <Table aria-label="Summer Chill tracks">
      <TableHeader>
        <TableRow>
          <TableHead className="w-12 pl-0 pr-6 max-md:hidden">#</TableHead>
          <TableHead className="pl-0">Title</TableHead>
          <TableHead className="max-md:hidden">Album</TableHead>
          <TableHead className="max-md:hidden">Added</TableHead>
          <TableHead align="right" className="w-[152px] max-md:hidden">
            Duration
          </TableHead>
          <TableHead padding="actions" align="right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tracks.map((track, index) => (
          <TableRow key={track.id}>
            <TableCell className="pl-0 pr-6 max-md:hidden">
              {index + 1}
            </TableCell>
            <TableCell className="pl-0">
              <TrackTitle track={track} />
            </TableCell>
            <TableCell className="max-md:hidden">{track.album}</TableCell>
            <TableCell className="max-md:hidden">
              <span className="whitespace-nowrap">{track.added}</span>
            </TableCell>
            <TableCell align="right" className="max-md:hidden">
              {track.duration}
            </TableCell>
            <TableCell padding="actions" align="right">
              <TableCellActions
                type="icons"
                icons={[
                  {
                    label: `More options for ${track.title}`,
                    icon: "more-horizontal",
                  },
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function NowPlayingBar() {
  const [progress, setProgress] = React.useState(24);

  return (
    <div className="sticky bottom-0 z-10 flex w-full flex-col gap-3 border-t border-stroke-weak bg-fill-inverse px-4 py-4 shadow-[0_-8px_4px_rgba(0,0,0,0.04),0_-20px_12px_rgba(0,0,0,0.08)] md:flex-row md:items-center md:gap-16 md:px-16 md:py-6">
      <div className="flex items-center gap-3">
        <TrackCover src={nowPlayingCoverSrc} size={64} />
        <div className="flex min-w-0 flex-col">
          <p className="truncate text-small font-semibold text-fg-strong">
            When I Fall Asleep
          </p>
          <p className="truncate text-tiny text-fg-weak">Tony Robson</p>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col-reverse gap-3 md:flex-col md:items-center">
        <div className="flex items-center justify-center gap-4">
          <ButtonIcon
            aria-label="Previous track"
            icon={<FeatherIcon name="skip-back" size={16} />}
            variant="secondary"
            tone="neutral"
            size="small"
            shape="circle"
          />
          <ButtonIcon
            aria-label="Play When I Fall Asleep"
            icon={<FeatherIcon name="play" size={24} />}
            variant="secondary"
            tone="neutral"
            shape="circle"
          />
          <ButtonIcon
            aria-label="Next track"
            icon={<FeatherIcon name="skip-forward" size={16} />}
            variant="secondary"
            tone="neutral"
            size="small"
            shape="circle"
          />
          <ButtonIcon
            aria-label="Volume"
            icon={<FeatherIcon name="volume-2" size={24} />}
            variant="tertiary"
            tone="neutral"
            className="md:hidden"
          />
        </div>
        <div className="flex w-full items-center gap-3">
          <span className="shrink-0 text-tiny text-fg-weak">0:56</span>
          <Slider
            aria-label="Playback position"
            value={progress}
            onValueChange={setProgress}
            showValue={false}
          />
          <span className="shrink-0 text-tiny text-fg-weak">3:54</span>
        </div>
      </div>

      <div className="flex items-center gap-2 max-md:hidden">
        <FeatherIcon
          name="volume-2"
          size={24}
          className="shrink-0 text-icon-neutral"
        />
        <LoadingBar
          aria-label="Volume"
          value={75}
          showLabel={false}
          className="w-[120px]"
        />
      </div>
    </div>
  );
}

export function MusicPlayerPage({
  sidebarOpen,
  defaultSidebarOpen = false,
  onSidebarOpenChange,
  userMenuDefaultOpen,
}: MusicPlayerPageProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultSidebarOpen);
  const [activePlaylist, setActivePlaylist] = React.useState("Summer Chill");
  const currentOpen = sidebarOpen ?? internalOpen;

  const setOpen = (next: boolean) => {
    if (sidebarOpen === undefined) {
      setInternalOpen(next);
    }
    onSidebarOpenChange?.(next);
  };

  return (
    <MusicPlayerLayoutTemplate
      mobileHeader={
        <NavigationSideMobileHeader
          logo={<PracticalMusicLogo />}
          avatar={<TemplateUserMenu variant="compact" user={janeSmith} />}
          onMenuClick={() => setOpen(true)}
        />
      }
      sidebar={
        <NavigationSide
          open={currentOpen}
          onOpenChange={setOpen}
          className="bg-fill-weaker"
        >
        <NavigationSideTop>
          <NavigationSideClose />
          <NavigationSideLogo>
            <PracticalMusicLogo />
          </NavigationSideLogo>
          <NavigationSideSection>
            <SearchInput aria-label="Search music" placeholder="Search" />
          </NavigationSideSection>
        </NavigationSideTop>
        <NavigationSideContent>
          {primaryNav.map((item) => (
            <NavigationSideItem
              key={item.label}
              href={`#${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              icon={<FeatherIcon name={item.icon} size={24} />}
            >
              {item.label}
            </NavigationSideItem>
          ))}
          <NavigationSideDivider />
          <NavigationSideHeader>Playlists</NavigationSideHeader>
          {playlists.map((playlist) => (
            <NavigationSideItem
              key={playlist}
              selected={activePlaylist === playlist}
              onClick={() => setActivePlaylist(playlist)}
            >
              {playlist}
            </NavigationSideItem>
          ))}
        </NavigationSideContent>
        <NavigationSideBottom>
          <div className="relative w-full">
            <TemplateUserMenu
              variant="navigation"
              user={janeSmith}
              defaultOpen={userMenuDefaultOpen}
            />
            <BadgeDot
              type="notification"
              size="small"
              className="pointer-events-none absolute left-[62px] top-[11px]"
            />
          </div>
        </NavigationSideBottom>
        </NavigationSide>
      }
    >
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <img
          src={headerBackgroundSrc}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[304px] w-full object-cover opacity-15 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <main className="relative z-[1] flex flex-1 flex-col gap-8 px-4 pt-8 md:gap-12 md:px-16 md:pt-16">
          <header className="flex flex-col items-center gap-6 text-center md:flex-row md:gap-8 md:text-left">
            <img
              src={playlistCoverSrc}
              alt="Summer Chill playlist cover"
              width={192}
              height={192}
              className="size-36 shrink-0 rounded-lg object-cover md:size-48"
            />
            <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-6 md:items-start">
              <div className="flex w-full max-w-[600px] flex-col gap-2">
                <p className="text-tiny font-semibold uppercase tracking-[2px] text-fg-weak">
                  Playlist
                </p>
                <h1 className="text-heading-1 font-semibold text-fg-strong">
                  Summer Chill
                </h1>
                <p className="text-small text-fg-weak">
                  16 songs&nbsp;&nbsp;·&nbsp;&nbsp;1 hr 10 mins
                </p>
              </div>
              <div className="flex w-full gap-4 md:w-auto">
                <Button
                  tone="neutral"
                  iconLeft={<FeatherIcon name="play" size={20} />}
                  className="flex-1 md:flex-none"
                >
                  Play
                </Button>
                <Button
                  variant="secondary"
                  tone="neutral"
                  iconLeft={<FeatherIcon name="heart" size={20} />}
                  className="flex-1 md:flex-none"
                >
                  Save
                </Button>
              </div>
            </div>
          </header>
          <PlaylistTable tracks={summerChillTracks} />
        </main>
        <NowPlayingBar />
      </div>
    </MusicPlayerLayoutTemplate>
  );
}
