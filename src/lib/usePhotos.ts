import { useEffect, useState } from "react";
import { getPhotos, type ResolvedPhoto } from "../lib/photoStore";
import { FALLBACK_PHOTOS } from "../lib/fallbackPhotos";

/**
 * Photos for the site chrome (hero, level switcher, vignettes).
 * Starts from the bundled fallback so first paint is never empty,
 * then refreshes from /api/photos (IndexedDB-backed) when available.
 */
export function usePhotos(): ResolvedPhoto[] {
  const [photos, setPhotos] = useState<ResolvedPhoto[]>(FALLBACK_PHOTOS);

  useEffect(() => {
    let live = true;
    getPhotos()
      .then((fresh) => {
        if (live && fresh.length > 0) setPhotos(fresh);
      })
      .catch(() => {
        /* fallback already in place */
      });
    return () => {
      live = false;
    };
  }, []);

  return photos;
}

export function photoById(
  photos: ResolvedPhoto[],
  id: string,
): ResolvedPhoto | undefined {
  return photos.find((p) => p.id === id);
}

export function photosByZone(photos: ResolvedPhoto[], zone: string): ResolvedPhoto[] {
  return photos.filter((p) => p.zone === zone);
}
