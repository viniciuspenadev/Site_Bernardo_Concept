import React from 'react';
import { Shield, Leaf, Clock, Award, BedDouble, Car, Ruler, Bath, MapPin, CheckCircle, Hammer, Rocket, BrickWall, PaintBucket, Key } from 'lucide-react';

export const getFeatureIcon = (iconName: string, className?: string) => {
  const props = { className };
  switch (iconName) {
    case 'Shield': return <Shield {...props} />;
    case 'Leaf': return <Leaf {...props} />;
    case 'Clock': return <Clock {...props} />;
    case 'Award': return <Award {...props} />;
    default: return <Shield {...props} />;
  }
};

export const Icons = {
  Bed: BedDouble,
  Car: Car,
  Ruler: Ruler,
  Bath: Bath,
  MapPin: MapPin,
  Check: CheckCircle,
  Hammer: Hammer,
  Rocket: Rocket,
  Brick: BrickWall,
  Paint: PaintBucket,
  Key: Key
};