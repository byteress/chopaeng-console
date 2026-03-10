import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import Topbar from '../../components/layout/Topbar';
import Button from '../../components/ui/Button';
import IslandMapUpload from '../../components/ui/IslandMapUpload';
import { createIsland } from '../../services/fakeApi';

const schema = z.object({
  id: z.string().min(3, 'ID must be at least 3 characters').regex(/^ISL-\d{3,}$/, 'ID must match ISL-XXX format'),
  name: z.string().min(2, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  items: z.string().min(1, 'At least one item is required'),
  theme: z.string().min(1, 'Theme is required'),
  cat: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  seasonal: z.string().min(1, 'Please select an option'),
});

type FormData = z.infer<typeof schema>;

const inputClass = `
  w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-[#2d4d5c] outline-none
  focus:ring-2 focus:ring-[#28a745]/40 transition-all
`;
const inputStyle = {
  background: '#f7f4e8',
  border: '1.5px solid #e8e0c8',
  fontFamily: "'Nunito', sans-serif",
};

const labelClass = 'block text-xs font-extrabold text-[#5e564d] uppercase tracking-wider mb-1';
const errorClass = 'text-xs text-red-500 mt-1 font-semibold';

export default function CreateIslandPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [mapImage, setMapImage] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    await createIsland({
      ...data,
      items: data.items.split(',').map(s => s.trim()).filter(Boolean),
      mapImage,
    });
    navigate('/islands');
  };

  return (
    <div className="min-h-screen">
      <Topbar
        title="Create Island"
        action={
          <Link to="/islands">
            <Button variant="secondary" size="md">← Back</Button>
          </Link>
        }
      />

      <div className="px-8 py-6 max-w-2xl">
        <div
          className="rounded-2xl p-7 shadow-sm"
          style={{ background: '#fffdf0', border: '1.5px solid #e8e0c8' }}
        >
          <h2 className="text-xl font-extrabold text-[#2d4d5c] mb-1" style={{ fontFamily: "'Fredoka One', cursive" }}>
            New Island
          </h2>
          <p className="text-sm text-[#8a7f6e] mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Fill in the details to register a new island.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>Island ID</label>
                <input {...register('id')} placeholder="ISL-019" className={inputClass} style={inputStyle} />
                {errors.id && <p className={errorClass}>{errors.id.message}</p>}
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>Name</label>
                <input {...register('name')} placeholder="My Island" className={inputClass} style={inputStyle} />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>Type</label>
                <select {...register('type')} className={inputClass} style={inputStyle}>
                  <option value="">Select type...</option>
                  <option>Trade</option>
                  <option>Active</option>
                  <option>Resource</option>
                  <option>Showcase</option>
                  <option>Event</option>
                </select>
                {errors.type && <p className={errorClass}>{errors.type.message}</p>}
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>Category</label>
                <select {...register('cat')} className={inputClass} style={inputStyle}>
                  <option value="">Select category...</option>
                  <option>Materials</option>
                  <option>Nature</option>
                  <option>Crafting</option>
                  <option>Economy</option>
                  <option>Food</option>
                  <option>Seasonal</option>
                  <option>Event</option>
                  <option>Fauna</option>
                  <option>Museum</option>
                </select>
                {errors.cat && <p className={errorClass}>{errors.cat.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>Theme</label>
                <select {...register('theme')} className={inputClass} style={inputStyle}>
                  <option value="">Select theme...</option>
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Autumn</option>
                  <option>Winter</option>
                  <option>Night</option>
                  <option>Industrial</option>
                  <option>Neutral</option>
                </select>
                {errors.theme && <p className={errorClass}>{errors.theme.message}</p>}
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>Seasonal</label>
                <select {...register('seasonal')} className={inputClass} style={inputStyle}>
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.seasonal && <p className={errorClass}>{errors.seasonal.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>
                Items <span className="normal-case font-normal text-[#b0a898]">(comma separated)</span>
              </label>
              <input
                {...register('items')}
                placeholder="bells, nook miles, furniture"
                className={inputClass}
                style={inputStyle}
              />
              {errors.items && <p className={errorClass}>{errors.items.message}</p>}
            </div>

            <div>
              <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>Description</label>
              <textarea
                {...register('description')}
                rows={3}
                placeholder="Describe this island..."
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
              {errors.description && <p className={errorClass}>{errors.description.message}</p>}
            </div>

            <div>
              <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>
                Island Map <span className="normal-case font-normal text-[#b0a898]">(optional)</span>
              </label>
              <IslandMapUpload value={mapImage} onChange={setMapImage} />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Link to="/islands">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button type="submit" variant="primary" loading={submitting}>
                Create Island
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
