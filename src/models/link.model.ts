import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["shortenId"])
export class Link extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	source: string;

	@Column()
	shortenId: string;

	@Column()
	viewCount: number;

	constructor(source: string, shortenId: string, id?: number) {
		super();

		this.id = id;
		this.source = source;
		this.shortenId = shortenId;
		this.viewCount = 0;
	}
}