interface IPiusRepository {
  create(data: ICreatePiuDTO): Promise<Pius>;
}

export default IPiusRepository;
