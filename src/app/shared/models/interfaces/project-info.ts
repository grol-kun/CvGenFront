export interface ProjectInfo {
  id: number;
  attributes: {
    name: string;
    description: string;
    domain: string;
    from: string;
    to: string;
    internalName: string;
  };
}

export interface ProjectInfoResponse {
  data: ProjectInfo[];
}
