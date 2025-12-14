import type { BandMember } from '@/types';
import { urlFor } from '@/lib/sanity/image';

interface BandMembersProps {
  members?: BandMember[];
}

// Fallback members when no CMS data
const defaultMembers = [
  { _id: '1', name: 'Member 1', role: 'Vocals', photoUrl: '/img/3.jpg' },
  { _id: '2', name: 'Member 2', role: 'Guitar', photoUrl: '/img/4.jpg' },
  { _id: '3', name: 'Member 3', role: 'Drums', photoUrl: '/img/5.jpg' },
];

export default function BandMembers({ members }: BandMembersProps) {
  const displayMembers = members && members.length > 0 ? members : defaultMembers;

  return (
    <section id="band" className="band main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <div className="block-content text-center gap-one-bottom-md">
              <div className="block-title">
                <h1 className="uppercase">The Band</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {displayMembers.map((member) => {
            const photoUrl = 'photo' in member && member.photo
              ? urlFor(member.photo).width(400).height(500).url()
              : (member as { photoUrl?: string }).photoUrl || '/img/3.jpg';

            return (
              <div key={member._id} className="col-lg-4 col-md-6">
                <div className="block-member gap-one-bottom-md">
                  <img src={photoUrl} alt={member.name} className="img-fluid" />
                  <div className="member-info">
                    <h5 className="mb-0 uppercase text-white">{member.name}</h5>
                    <span className="opc-70">{member.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
