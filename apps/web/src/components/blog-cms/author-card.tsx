import Image from "next/image";

type Props = {
  name: string;
  role?: string;
  avatar?: string;
};

export function AuthorCard({ name, role, avatar }: Props) {
  return (
    <div className="flex items-center gap-3">
      {avatar ? (
        <Image
          src={avatar}
          alt={name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">
            {name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}

      <div>
        <p className="text-sm font-semibold">{name}</p>
        {role && (
          <p className="text-xs text-muted-foreground">{role}</p>
        )}
      </div>
    </div>
  );
}